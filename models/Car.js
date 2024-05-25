const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    bodyChassis: { type: String, required: true },
    engineVal: { type: String, required: true },
    engineNo: { type: String, required: true }
});

module.exports = mongoose.model('Car', carSchema);
