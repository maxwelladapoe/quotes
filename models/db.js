const { Sequelize } = require('sequelize')
const dbConfig = require('../config/db.config.js')

// connect to the database

const connection = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql'
})

// open the MySQL connection
const testConnection = async () => {
  try {
    await connection.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

testConnection()

module.exports = connection
