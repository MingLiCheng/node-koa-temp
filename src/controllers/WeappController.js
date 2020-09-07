const { weappRedis } = require('../../plugins/index')
const { weapp } = require('../../config/index')
const WeappService = require('../services/WeappService')
module.exports = {
  getJsSdkConfig: async (ctx, next) => {
    const { url, debug = false, jsApiList } = ctx.request.query
    const config = await WeappService.jsSdkConfig(url)
    ctx.body = {
      code: 200,
      config: {
        ...config,
        debug: debug === 'true' ? true : false,
        appId: weapp.appId,
        jsApiList: jsApiList ? jsApiList.split(',') : []
      }
    }
  },
  redisTest: async (ctx, next) => {
    // const x = await weappRedis.set('keyxx', 'test', 'EX', 60)
    const y = await weappRedis.get('keyxx')
    ctx.body = {
      code: 200,
      message: 'hello redisTest',
      data: {
        // x,
        y
      }
    }
  }
}