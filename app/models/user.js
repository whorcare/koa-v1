const bcrypt = require('bcryptjs') // 数据加密包
const { Sequelize, Model } = require('sequelize'); // 对象

const  { sequelize } = require('../../core/db') // 实例

class User extends Model { // 用Model生成数据表
  static async verifyEmailPassword(email, plainPassword) { // 验证密码
    // 查询用户
    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      throw new global.errs.AuthFailed('用户不存在')
    }

    const correct = bcrypt.compareSync(plainPassword, user.password) // 进行加密的密码 对比
    if (!correct) {
      throw new global.errs.AuthFailed('密码不正确')
    }

    return user
  }

  // 查询是否存在 opendid 的小程序用户
  static async getUserByOpenid(openid) {
    // 查询用户
    const user = await User.findOne({
        where: {
            openid
        }
    })

    return user;
  }

  // 注册小程用户
  static async createUserByOpenid(openid) {
      // 查询用户
      const user = await User.create({
          openid
      })

      return user;
  }
}


User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true, // 主键 不能重复 不能为空
    autoIncrement: true, // 自动增长
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true, // 不可重复
  },
  password: {
    type: Sequelize.STRING,
    set(val) { // 处理 model 的 属性操作
      const salt = bcrypt.genSaltSync(10) // 密码加密复杂度设置 -> 盐
      const psw = bcrypt.hashSync(val, salt) // 对密码进行加密处理
      this.setDataValue('password', psw) // 这个this方法指向Model
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true,
  },
  test: Sequelize.STRING,
}, {
  sequelize, // 必传
  tableName: 'user', // 表名字
})

module.exports = {
  User
}