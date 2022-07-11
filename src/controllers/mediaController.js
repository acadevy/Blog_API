const Media = require("../models/media");
const  sharp = require("sharp")

const create_media = async(req,res)=>{
  try{
    const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();
    const media = new Media();
    media.image = buffer;
    await media.save()
    res.status(200).json({message: "Image uploaded successfully"});

  } catch(err){
    res.status.json(err);
  }
  
}

const get_media = async(req,res)=>{
    const { id } = req.params;
    
    try {
      const media = await Media.findById(id);
      if(media === null) {
        return res.status(404).json({message: "media doesn't exist"});
      }
      
      return res.json({media})
    } catch(err) {
      res.status(500).json({message: err.message});
    }
  }

  const delete_media = async(req,res)=>{
    const { id } = req.params;  
    const {owner} = req.body;
    const check_user = (owner==req.user._id);
    try {
    const media = await Media.findById(id);
    if(check_user == false){
      return res.status(401).json({message:"You are not authorized to delete this image"})
    }
    if(media === null) {
      return res.status(404).json({message: "media doesn't exist"});
    }
    //  Delete media from database
    await media.remove();
    res.json({ message: "media deleted successfully" })
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
  }


module.exports = {
  create_media,get_media,delete_media
}