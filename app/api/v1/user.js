const Router = require("koa-router")
const { RegisterValidator } = require('../../validators/user')
const { User } = require('../../models/user')
const { handleResult } = require('../../lib/helper')
const router = new Router({
  prefix: '/v1/user', // 接口地址公共前缀
})

// 注册api
router.post('/register', async (ctx, next) => {
  // 1 接收参数
  // 2 linValidatoor 判断参数
  // email password password2 nickname
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname')
  }

  const r = await User.create(user) // 重点：await是对Promise表达式求值

  handleResult('注册成功')
})

module.exports = router