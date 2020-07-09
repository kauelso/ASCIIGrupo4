const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/plantoria',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

module.exports = mongoose;