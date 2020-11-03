module.exports = {
  // dev prod 环境
  environment: 'dev',
  database: {
      dbName: 'demo1',
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '123456'
  },
  security: {
      secretKey: "xtLwMgN5SrqGQ7Rakp2mmcHsHlG1i1evS1vO03MkaII0cXps1j", // 随机字符串
      // 过期时间 1小时
      expiresIn: 60 * 60 * 24 * 30
  },
  wx: {
      appId: 'wxd2e0c5da046bc12e',
      appSecret: 'e4b11b262b491bc81ddce8e89fc2d972',
      loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}
