const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String },
  model: { type: String },
  year: { type: Number },
  type: { type: Number },
  bodyChassis: { type: String },
  discThicknessMax: { type: Number },
  numOfHoles: { type: Number },
  engineVal: { type: String },
  height: { type: Number },
  centeringDiameter: { type: Number },
  engineNo: { type: String },
  frontRear: { type: String },
  outter: { type: Number },
  pitchCircle: { type: Number },
  drum: { type: Number },
  bendix: { type: Number },
  bendixEur: { type: Number },
  oem: { type: Number },
  vag: { type: Number },
  image: { type: String },
});

module.exports = mongoose.model("Car", carSchema);
// const mongoose = require('mongoose');

// const carSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     model: { type: String, required: true },
//     year: { type: Number, required: true },
//     bodyChassis: { type: String, required: true },
//     engineVal: { type: String, required: true },
//     engineNo: { type: String, required: true }
// });

// module.exports = mongoose.model('Car', carSchema);
