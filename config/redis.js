module.exports = {
    'redis_common': {
		host: ENV.REDIS_HOST,
		port : ENV.REDIS_PORT,
		password : ENV.REDIS_PASSWORD,
		db : Number(ENV.REDIS_DB)
	},
};