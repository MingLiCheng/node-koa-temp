const router = require('koa-router')({ prefix: '/weapp' })
const WeappController = require('../src/controllers/WeappController')
router.get('/', (ctx) => {
  ctx.body = 'the api of weapp is running'
})
router.get('/test', (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: 'The api of weapp is running'
  }
})

router.get('/redis/test', WeappController.redisTest)
router.get('/getJsSdkConfig', WeappController.getJsSdkConfig)

module.exports = router
