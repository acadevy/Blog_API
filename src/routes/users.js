const express = require('express');
const router = new express.Router();
const userController = require('../controllers/userController');
const auth = require("../middlewares/auth");

router.post('/', userController.create_user);
router.post('/login',userController.login_user);
router.get('/:id',auth,userController.get_a_user);
router.patch('/update_user',auth,userController.update_user);
router.post('/logout',auth,userController.log_out_user);
router.post('/logoutall',auth, userController.log_out_all_users);

module.exports = router;