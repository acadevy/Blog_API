const User = require("../models/User");

const create_user = async (req,res) => {
    const user = new User(req.body);
    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).json({ status: 201,data:user});
    } catch (error) {
      res.status(400).json(error.message);
    }
}


const login_user = async (req,res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user});
  } catch (error) {
    res.status(400).send(error);
  }
}



const log_out_user = async (req,res) => {
  
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();
  
    res.status(200).send('User logged out!');
  } catch (error) {
    res.status(500).send(error);
  }
  
}

const log_out_all_users = async(req,res) =>{
  try {
    req.user.tokens = [];
    await req.user.save();

    res.status(200).send('User logged out from all sessions!');
  } catch (error) {
    res.status(500).send(error);
  }
}



module.exports = {
create_user,login_user,log_out_user,log_out_all_users
}