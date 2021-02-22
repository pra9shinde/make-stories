const User = require('../models/User');
const bcrypt = require('bcryptjs');
const path = require('path');

const multer = require('multer');

const { validateRegister, validateLogin } = require('../util/validator');
const { generateToken } = require('../util/token');

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const uploadStorage = multer({ storage: storage }).single('profilePic');

exports.register = (req, res, next) => {
    const errors = {};
    // Upload File using multer
    uploadStorage(req, res, async function (err) {
        if (err) {
            //   handle error
            errors.file = err;
            return res.json({
                status: 'failure',
                errors: errors,
            });
        }

        let profilePic = path.join('uploads', 'avatar.svg');
        if (req.file) {
            //If file is uploaded by user
            profilePic = path.join('uploads', req.file.filename);
        }

        // Validate and Add to DB
        try {
            const username = req.body.username;
            const password = req.body.password;
            const confirmPassword = req.body.confirmPassword;
            const email = req.body.email;
            const name = req.body.name;

            let user = await User.findOne({ username: username });
            if (user) {
                errors.username = 'Username already taken';
                return res.json({
                    status: 'success',
                    errors: errors,
                });
            }

            // Validate Inputs
            const { valid, validationErrors } = validateRegister(username, email, password, confirmPassword, name);

            if (!valid) {
                return res.json({
                    status: 'success',
                    errors: validationErrors,
                });
            }

            const encryPassword = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                name,
                password: encryPassword,
                profilePic: profilePic,
                createdAt: new Date().toISOString(),
            });

            const data = await newUser.save();
            user = {
                id: data._id,
                username: data.username,
                email: data.email,
                name: data.name,
                profilePic: data.profilePic,
            };

            const token = generateToken(user);

            return res.json({
                status: 'success',
                errors: errors,
                user: user,
                token: token,
            });
        } catch (err) {
            return res.json({
                status: 'failure',
                errors: err,
            });
        }
    });
};

exports.login = async (req, res, next) => {
    const loginErrors = {};

    const username = req.body.username;
    const password = req.body.password;

    const { errors, valid } = validateLogin(username, password);

    if (!valid) {
        return res.json({
            status: 'success',
            errors: errors,
        });
    }

    const user = await User.findOne({ username });
    if (!user) {
        loginErrors.username = 'User not found';
        return res.json({
            status: 'success',
            errors: loginErrors,
        });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        loginErrors.authentication = 'Wrong credentials';
        return res.json({
            status: 'success',
            errors: loginErrors,
        });
    }

    const data = {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        profilePic: user.profilePic,
    };

    const token = generateToken(data);
    return res.json({
        status: 'success',
        errors: errors,
        user: data,
        token: token,
    });
};
