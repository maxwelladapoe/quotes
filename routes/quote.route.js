const router = require('express').Router()
const quoteController = require('../controllers/quote.controller.js')

router.get('/categories', quoteController.findAllCategories)
router.get('/random', quoteController.findRandomQuote)
router.get('/quote_of_the_day', quoteController.findQuoteOfTheDay)
router.get('/:id', quoteController.findOne)
router.get('/', quoteController.findAll)

module.exports = router
