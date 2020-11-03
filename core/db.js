// 数据库设置&链接
const Sequelize = require('sequelize');
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql', // 记得安装mysql2 npm包（驱动）
  host,
  port,
  logging: console.log, // sql 展示在命令行
  timezone: '+08:00', // 时区
  define: {
    timestamps: true, // 是否自动创建时间
    paranoid: true, // 自动生成 delete_time
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    // 把驼峰命名转换为下划线
    underscored: true,
  },
})

sequelize.sync({ // 必须语句 执行后创建数据库
})

module.exports = {
  sequelize
}