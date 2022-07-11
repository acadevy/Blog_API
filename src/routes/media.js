const express = require('express');
const router = new express.Router();
const mediaController = require('../controllers/mediaController');
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");


router.post('/upload',upload.single("avatar"),auth,mediaController.create_media);

module.exports = router;