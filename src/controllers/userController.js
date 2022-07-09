const User = require("../models/user");
const auth = require('../middlewares/auth');

exports.createUser = async (req,res) => {
    const user = new User(req.body);
    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ status: 201,data:user});
    } catch (error) {
      res.status(400).json(error);
    }
}