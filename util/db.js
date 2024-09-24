const Sequelize = require('sequelize')
const { deserialize } = require('v8')

const sequelize = new Sequelize('web_shop', 'root', 'qwerty', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize