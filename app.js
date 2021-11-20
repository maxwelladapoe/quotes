require('dotenv').config()
const express = require('express')
const cors = require('cors')
const quotesRoutes = require('./routes/quote.route.js')
const categoryRoutes = require('./routes/category.route.js')

const app = express()
const corsOptions = { origin: 'http://localhost:8082' }
app.use(cors(corsOptions))

// parse to json requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/quotes', quotesRoutes)
app.use('/categories', categoryRoutes)
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the motivation application.' })
})

const PORT = process.env.APPLICATION_PORT || 8082
app.listen(PORT, () => {
  console.log((`Server is running on ${PORT}`))
})
