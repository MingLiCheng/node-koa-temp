const router = require('koa-router')({ prefix: '/weapp' })

router.get('/', (ctx) => {
  ctx.body = 'the api of weapp is running'
})
router.get('/test', (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: 'The api of weapp is running'
  }
})

module.exports = router
