const categoryModel = require('../models/category.model.js')

exports.findOne = async (req, res) => {
  const id = req.params.id
  const category = await categoryModel.findByPk(id)
  if (category === null) {
    res.status(404).send({
      message: `The quote with id ${req.params.id}. was not found`
    })
  } else {
    res.send(category)
  }
}

exports.findAll = async (req, res) => {
  const categories = await categoryModel.findAll()
  if (categories === null) {
    res.status(404).send({
      message: 'No quotes were found'
    })
  } else {
    res.send(categories)
  }
}
