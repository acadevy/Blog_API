const express = require('express');
const router = new express.Router();
const mediaController = require('../controllers/mediaController');
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");


router.post('/upload',auth,upload.single("image"),mediaController.create_media);
router.get('/:id',auth,mediaController.get_media);
router.delete('/:id',auth,mediaController.delete_media);

module.exports = router;