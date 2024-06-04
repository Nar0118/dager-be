const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.Mixed },
  model: { type: mongoose.Schema.Types.Mixed },
  year: { type: mongoose.Schema.Types.Mixed },
  type: { type: mongoose.Schema.Types.Mixed },
  bodyChassis: { type: mongoose.Schema.Types.Mixed },
  discThicknessMax: { type: mongoose.Schema.Types.Mixed },
  numOfHoles: { type: mongoose.Schema.Types.Mixed },
  engineVal: { type: mongoose.Schema.Types.Mixed },
  height: { type: mongoose.Schema.Types.Mixed },
  centeringDiameter: { type: mongoose.Schema.Types.Mixed },
  engineNo: { type: mongoose.Schema.Types.Mixed },
  frontRear: { type: mongoose.Schema.Types.Mixed },
  outter: { type: mongoose.Schema.Types.Mixed },
  pitchCircle: { type: mongoose.Schema.Types.Mixed },
  drum: { type: mongoose.Schema.Types.Mixed },
  bendix: { type: mongoose.Schema.Types.Mixed },
  bendixEur: { type: mongoose.Schema.Types.Mixed },
  oem: { type: mongoose.Schema.Types.Mixed },
  vag: { type: mongoose.Schema.Types.Mixed },
  image: { type: mongoose.Schema.Types.Mixed },
});

module.exports = mongoose.model("Car", carSchema);
