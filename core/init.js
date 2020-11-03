const requireDirectoyr = require('require-directory')
const Router = require('koa-router');

class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadHttpException()
    InitManager.loadConfig()
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/testPro/node/demo1/config/config.js'
    const config = require(configPath)
    global.config = config
  }

  static initLoadRouters() {
    // 导入某个目录下的所有模块
    requireDirectoyr(module, './../app/api', { visit: whenLoadModule })

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  // 将所有返回模块放置到全局 global 对象上去
  static loadHttpException() {
    const errors = require('./http-exception')
    global.errs = errors
  }
}

module.exports = InitManager