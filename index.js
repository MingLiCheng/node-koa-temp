const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const Static = require('koa-static')
const Mount = require('koa-mount')
const cors = require('koa2-cors')

const app = new Koa()
app.use(cors())
app.use(bodyParser())
const router = new Router()

// 开放静态资源文件夹
app.use(Mount('/api', Static(path.join(__dirname, 'public'))))


router.get('/', async (ctx, next) => {
  ctx.body = 'the api is running'
})
router.get('/test', async (ctx, next) => {
  ctx.body = 'Hello Koa Router'
})

const weappRouter = require('./router/weapp')
app.use(weappRouter.routes())

app.use(router.routes());

app.listen(3000, () => {
  console.log('the koa is running 3000');
})

