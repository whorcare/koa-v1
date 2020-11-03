const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.log(`当前环境: ${global.config.environment}`)

    const isHttpException = error instanceof HttpException // 判断是否是HttpException错误
    const isDev = global.config.environment === 'dev'

    if (isDev && !isHttpException) {
      throw error
    }

    if (HttpException) {
      // 已知异常的处理姿势
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method}${ctx.path}`,
      }
      ctx.status = error.code
    } else {
      // 未知异常的处理
      ctx.body = {
        mas: 'O(∩_∩)O哈哈~',
        error_code: 999,
        request: `${ctx.method}${ctx.path}`,
      }
      ctx.status = error.code
    }
  }
}

module.exports = catchError