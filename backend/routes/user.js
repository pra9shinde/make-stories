const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

router.get('/:userId', userController.getUser);
router.post('/updateUser', userController.updateUser);

module.exports = router;
