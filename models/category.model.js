const { DataTypes } = require('sequelize')
const sql = require('./db.js')

// constructor
const Category = sql.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  like_count: {
    type: DataTypes.INTEGER,
    default: 0
  }

}, {
  timestamps: false
})

module.exports = Category
