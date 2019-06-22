//Set up mongoose connection
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect(ENV.DATABASE_URL,{ useNewUrlParser: true }); 
mongoose.Promise = global.Promise;
module.exports = mongoose;