const mongoose = require('mongoose')
require('dotenv').config()

const Product = require('./models/Product')

const products = [
  {
    name: 'Soft Teddy Bear',
    category: 'Toys',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500',
    description: 'A soft and safe teddy bear for babies.',
    countInStock: 10
  },
  {
    name: 'Baby Clothes Set',
    category: 'Clothes',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500',
    description: 'Comfortable clothes set for newborns.',
    countInStock: 12
  },
  {
    name: 'Feeding Bottle',
    category: 'Feeding',
    price: 7.5,
    image: 'https://images.unsplash.com/photo-1584473457409-ae5c91d7d8e1?w=500',
    description: 'Easy-to-use feeding bottle for daily use.',
    countInStock: 20
  },
  {
    name: 'Baby Stroller',
    category: 'Strollers',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1597466765990-64ad1c35dafc?w=500',
    description: 'Lightweight stroller for outdoor walks.',
    countInStock: 5
  },
  {
    name: 'Diaper Pack',
    category: 'Diapers',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?w=500',
    description: 'Soft and comfortable diapers for babies.',
    countInStock: 30
  },
  {
    name: 'Baby Blanket',
    category: 'Essentials',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
    description: 'Warm and cozy blanket for newborns.',
    countInStock: 15
  }
]

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    await Product.deleteMany()
    await Product.insertMany(products)

    console.log('Products added successfully')
    process.exit()
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

seedProducts()