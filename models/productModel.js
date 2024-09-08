const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    date_registred: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = { ProductModel };
