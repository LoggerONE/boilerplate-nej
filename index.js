const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const	path = require('path');
const	i18n = require("i18n");
const redis = require("redis");

require('dotenv').config({path: __dirname + '/.env' }); 
ENV = process.env;
SERVER_DIR = __dirname;

utils = require('./app/Middleware/utils');
appRoot = path.dirname(require.main.filename);

var db = require('./config/mongoose')

var port =  Number(ENV.PORT)

if(ENV.NODE_APP_INSTANCE !== undefined){
    port =  Number(ENV.PORT) + Number(ENV.NODE_APP_INSTANCE);
}

var redis_conf = require('./config/redis');
redis_common = redis.createClient(redis_conf.redis_common); // global redis connection


app.use(cookieParser(ENV.APP_KEY));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

console.log("APPKEY : ", ENV.APP_KEY);
console.log("SET SESSION");

/* ============ View Engine Setup ============ */
app.set('views', path.join(__dirname, './resources/views')); 
app.set('view engine', 'ejs');

/* ============ Static Path Setup ============ */
app.use(express.static(path.join(__dirname, 'public')));
app.locals.basedir = path.join(__dirname, 'views');

var page_v1_route = require('./app/Routes/PageV1Route');
var auth_route = require('./app/Routes/AuthRoute');

app.use('/', [utils.allow_cors], page_v1_route);
app.use('/auth', [utils.allow_cors], auth_route);

app.listen(port ,function (){
	console.log(ENV.APP_NAME + ' Server START - ' + port );
});