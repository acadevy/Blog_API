const mongoose = require("mongoose");

const DATABASE_URI = process.env.DATABASE_URI;

mongoose.connect(DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true
}).then(() => console.log('MongoDB connected successfully.'))
.catch(err => console.log(err));


module.exports = {
  mongoose
};
