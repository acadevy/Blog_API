const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim:true
  },
  email: {
    required: true,
    type: String,
    unique: true,
    trim:true,
    lowercase: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Email is not valid');
        }
    }
  },
  username: {
    required: true,
    type: String,
    unique: true,
    trim: true
  },
  password: {
    required: true,
    type: String
  },
  tokens:[
    {
        token: {
            type: String,
            required: true
        }
    }
  ],
}, { timestamps: true });


// create middleware for encrypting the password
userSchema.pre('save', async function (next) {
  const user = this;
  if(this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash
    } catch(err) {
      return next(err);
    }
  } else return next();
});



userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);

  this.tokens = this.tokens.concat({ token });
  await this.save();
  

  return token;
};


userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login!');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login!');
  }

  return user;
};


// Delete user tasks when user is removed
userSchema.pre('remove', async function(next) {
  await Task.deleteMany({ owner: this._id });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;