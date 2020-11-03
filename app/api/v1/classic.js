const Router = require("koa-router");
const router = new Router({
  prefix: "/v1/classic"
})

const { HttpException, ParameterException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/classic')
const { handleResult } = require('../../lib/helper')

const { Auth } = require('../../../middlewares/auth')

router.get('/latest', new Auth().m, (ctx, next) => {
  const path = ctx.param
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body

  handleResult('suc')

  // const v = new PositiveIntegerValidator().validate(ctx) // 自动寻找id
  // console.log(v)
  // v.get('path.id')

  // const v = await new PositiveIntegerValidator().validate(ctx, {
  //   id: 'index'
  // })

  // const index = v.get('path.index');

  // if (true) {
  //   // const error = new HttpException('出错了', 10001, 400)
  //   const error = new ParameterException()
  //   // const error = new global.errs.ParameterException() 全局global 但不推荐这样写
  //   throw error
  // }


  // throw new Error('API ERROR')
})

module.exports = router