const User = require("../models/User");

exports.create_user = async (req,res) => {
    const user = new User(req.body);
    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).json({ status: 201,data:user});
    } catch (error) {
      res.status(400).json(error.message);
    }
}


exports.login_user = async (req,res) => {
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



exports.log_out_user = async (req,res) => {
  
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



