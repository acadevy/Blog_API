const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    log(`${chalk.bgMagenta('connected to database')}`)
  })
  .catch((err) => {
    log(`${chalk.red(err)}`)
  });


module.exports = {
  mongoose
};