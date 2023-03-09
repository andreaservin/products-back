const express = require('express')
const mongoose = require('mongoose')

const app = express()

// model
const ProductSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
})

const Product = mongoose.model('Product', ProductSchema)

// connect database
mongoose.set('strictQuery', false)
mongoose.connect(
  process.env.MONGODB_URL || 'mongodb://localhost:27017/products',
  { useNewUrlParser: true }
)

// middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/products', async (req, res) => {
  const products = await Product.find()
  res.json(products).end()
})

app.listen(3000, () => console.log('Listening on port 3000 ...'))
