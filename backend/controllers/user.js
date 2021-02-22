const User = require('../models/User');

const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { validateRegister } = require('../util/validator');
const { generateToken } = require('../util/token');

exports.getUser = async (req, res, next) => {
    const userId = req.params.userId;

    const user = await User.findOne({ _id: userId });

    if (user) {
        return res.json({
            status: 'success',
            user: user,
        });
    }
};

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

exports.updateUser = (req, res, next) => {
    const errors = {};

    uploadStorage(req, res, async function (err) {
        const id = req.body.id;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const email = req.body.email;
        const name = req.body.name;

        if (err) {
            //   handle error
            errors.file = err;
            return res.json({
                status: 'failure',
                errors: errors,
            });
        }

        if (!id || id.length <= 0) {
            errors.userId = 'User ID missing';
            return res.json({
                status: 'success',
                error: errors,
            });
        }

        // Get Existing Image
        const oldData = await User.findOne({ _id: id });
        let profilePic = oldData.profilePic;

        if (req.file) {
            //Delete Old picture
            // fs.unlinkSync(profilePic);

            profilePic = path.join('uploads', req.file.filename);
            console.log('File Uploaded');
        }

        const { valid, validationErrors } = validateRegister('', email, password, confirmPassword, name, false);

        if (!valid) {
            return res.json({
                status: 'success',
                errors: validationErrors,
            });
        }

        const encryPassword = await bcrypt.hash(password, 12);

        const updateData = { name, email, password: encryPassword, profilePic };
        const doc = await User.findByIdAndUpdate(id, updateData, { new: true });

        const latestData = {
            id: doc._id,
            username: doc.username,
            email: doc.email,
            name: doc.name,
            profilePic: doc.profilePic,
        };

        const token = generateToken(latestData);

        return res.json({
            status: 'success',
            user: latestData,
            token,
            errors,
        });
    });
};
