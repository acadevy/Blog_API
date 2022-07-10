const express = require('express');
const router = new express.Router();
const userController = require('../controllers/userController');
const auth = require("../middlewares/auth");

router.post('/', userController.create_user);
router.post('/login',userController.login_user);
router.post('/logout',auth.auth,userController.log_out_user);

module.exports = router;