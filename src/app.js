const express = require('express');
const orders = require('./orders');

const app = express();

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    version: process.env.APP_VERSION || 'local'
  });
});

// Get all orders
app.get('/api/orders', (req, res) => {
  res.json(orders.list());
});

// Create an order
app.post('/api/orders', (req, res) => {
  const { item, quantity } = req.body;

  if (!item || !Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({
      error: 'Valid item and positive integer quantity are required'
    });
  }

  const order = orders.create({ item, quantity });
  res.status(201).json(order);
});

module.exports = app;