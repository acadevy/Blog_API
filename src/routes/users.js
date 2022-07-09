const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
// router.post('/users/login',userController.loginUser);

module.exports = router;