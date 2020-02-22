var mongoose = require('mongoose');

var SalesSchema = new mongoose.Schema({
  id: String,
  itemId: String,
  itemName: String,
  itemPrice: Number,
  itemQty: Number,
  totalPrice: String,
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sales', SalesSchema);