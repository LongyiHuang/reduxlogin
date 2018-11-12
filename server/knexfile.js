// Update with your config settings.
// 安装knex npm install knex --save
// 全局安装knex npm install -g knex
// 到项目目录下初始化 knex init
// 安装数据库所适配的数据库依赖包 npm install pg --save 或者 npm install mysql --save
// 创建migrate数据里迁移文件 knex migrate:make users
// 在数据库表迁移文件中写表结构
// 执行 knex migrate:latest 生成数据库表结构
// 安装bookshelf orm框架 npm install bookshelf --save
// 新建bookshelf.hjs 配置 bookshelf与knex 中的数据库环境关联
// 创建models文件夹，创建数据库表对象user.js，并为相应的表创建对象关联
// 要对表进行操作时，只需要导入表对象即可


module.exports = {

  development: {
    client: 'mysql',
    connection: {
        host:'localhost',
        user: 'root',
        password: '123456',
        database: 'reduxlogin'

        // host:'192.168.0.124',
        // user: 'work',
        // password: '123456',
        // database: 'xiaobailong'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
        host:'localhost',
        user: 'root',
        password: '123456',
        database: 'reduxlogin'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
