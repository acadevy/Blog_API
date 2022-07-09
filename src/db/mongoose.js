const mongoose = require("mongoose");
const {log} = console;

const DATABASE_URI = process.env.DATABASE_URI;

mongoose.connect(DATABASE_URI, { useNewUrlParser: true})
  .then(() => {
    log(('connected to database'))
  })
  .catch((err) => {
    log((err))
  });

module.exports = {
  mongoose
};