const router = require('express').Router()
const categoryController = require('../controllers/category.controller.js')
router.get('/', categoryController.findAll)

module.exports = router
