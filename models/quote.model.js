const { DataTypes } = require('sequelize')
const sql = require('./db.js')

// constructor
const Quote = sql.define('Quote', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  quote: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  like_count: {
    type: DataTypes.INTEGER,
    default: 0
  },
  used_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
})

module.exports = Quote
