
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect(ENV.DATABASE_URL,{ useNewUrlParser: true }); 