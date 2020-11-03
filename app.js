const Koa = require('koa');
// 获取body参数的库
const parser = require('koa-bodyparser')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(catchError)
app.use(parser())
InitManager.initCore(app)

app.listen(3000)

// sql表
// model_user 用户
// movie 电影电视剧

// 业务表