const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    kilometers: {type: String, required: true},
    model: {type:String, required:true},
    year:{type: Number, required: true},
    price: { type: Number, required: true },
    date_registred: { type: Date, default: Date.now }
});

const CarModel = mongoose.model('Car', CarSchema);

module.exports = { CarModel };
