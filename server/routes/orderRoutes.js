const express = require('express')
const Order = require('../models/Order')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { userId, username, items, totalPrice } = req.body

    if (!userId || !username || !items || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order data' })
    }

    const order = await Order.create({
      userId,
      username,
      items,
      totalPrice
    })

    res.status(201).json({
      message: 'Order created successfully',
      order
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({
      createdAt: -1
    })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router