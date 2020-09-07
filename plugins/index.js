const redisStore = require('koa-redis');
const GlobalConfig = require('../config/index.js')
const weappRedis = new redisStore({
  ...GlobalConfig.redis,
  keyPrefix: 'weapp:',
  db: 0
}).client

module.exports = {
  weappRedis
}
