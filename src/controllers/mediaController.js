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


module.exports = {
  create_media
}