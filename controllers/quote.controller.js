const moment = require('moment')
const quoteModel = require('../models/quote.model.js')
const { Sequelize } = require('sequelize')

// get quote by id
exports.findOne = async (req, res) => {
  const id = req.params.id
  const quote = await quoteModel.findByPk(id)
  if (quote === null) {
    res.status(404).send({
      message: `The quote with id ${req.params.id}. was not found`
    })
  } else {
    res.send(quote)
  }
}

// get all quotes by category, id or general
exports.findAll = async (req, res) => {
  const author = req.query.author; const category = req.query.category; const page = req.query.page || 1
  let options
  if (author && category) {
    options = { where: { author: author, category: category } }
  } else if (author) {
    options = { where: { author: author } }
  } else if (category) {
    options = { where: { category: category } }
  } else {
    options = {}
  }
  const numberOfItems = 20
  let absolutePage = Math.abs(page)
  if (absolutePage === 0) {
    absolutePage = 1
  }
  options.offset = (absolutePage - 1) * numberOfItems
  options.limit = numberOfItems
  const quotes = await quoteModel.findAll(options)
  if (quotes === null) {
    res.status(404).send({
      message: 'No quotes were found'
    })
  } else {
    res.send(quotes)
  }
}

exports.findAllCategories = async (req, res) => {
  const categories = await quoteModel.findAll({
    attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category']]
  })
  if (categories === null) {
    res.status(404).send({
      message: 'No categories were found'
    })
  } else {
    const categoriesArray = []
    categories.forEach(categoryRowItem => {
      categoriesArray.push(categoryRowItem.category)
    })
    res.send(categoriesArray)
  }
}

async function getRandomQuote (withDate) {
  const options = {
    order: [Sequelize.fn('RAND')]
  }
  if (withDate) {
    options.where = {
      used_date: null // {[Op.ne]: null}
    }
  }
  return await quoteModel.findOne(options)
}

exports.findRandomQuote = async (req, res) => {
  const randomQuote = await getRandomQuote()
  if (randomQuote === null) {
    res.status(500).send({
      message: 'Something went wrong'
    })
  } else {
    res.send(randomQuote)
  }
}

exports.findQuoteOfTheDay = async (req, res) => {
  let quoteOfTheDay = await quoteModel.findOne({
    where: {
      used_date: moment().startOf('day')
    }
  })
  if (quoteOfTheDay === null) {
    quoteOfTheDay = await getRandomQuote(true)
    if (quoteOfTheDay) {
      // update record
      await quoteModel.update({
        used_date: moment().startOf('day')
      }, { where: { id: quoteOfTheDay.id } })
      res.send(quoteOfTheDay)
    } else {
      res.status(500).send({
        message: 'No items found'
      })
    }
  } else {
    res.send(quoteOfTheDay)
  }
}
