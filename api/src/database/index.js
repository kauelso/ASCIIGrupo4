const mongoose = require('mongoose');

const bdUrl = process.env.BD_URL;

mongoose.connect(bdUrl,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,});

mongoose.Promise = global.Promise;

module.exports = mongoose;