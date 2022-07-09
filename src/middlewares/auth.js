const jtw = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace(/^Bearer\s/, '');
    const decode = jtw.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode._id, 'tokens.token': token });

    if (!user) {
      return res.status(401).json({ error: 'Token not found' });
    }

    req.token = token;
    req.user = user;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized' });
  }
};

module.exports = {
    auth
}
