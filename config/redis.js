module.exports = {
    'redis_config': {
		host: ENV.REDIS_HOST,
		port : ENV.REDIS_PORT,
		password : ENV.REDIS_PASSWORD,
		db : Number(ENV.REDIS_DB)
	},
};