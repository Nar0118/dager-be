const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Car = require("../models/Car");
const auth = require("../middleware/auth");
const getCar = require("../middleware/car");

const mongoURI =
  "mongodb+srv://narekxachatryan1998:eCHu2L4x7jlrKpL4@cluster0.7zacuse.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Get all cars
router.get("/", async (req, res) => {
  try {
    const {
      limit = 10,
      offset = 0,
      search = "",
      name = "",
      year = "",
    } = req.query;
    const query = search
      ? { name: { $regex: search, $options: "i" } }
      : name
      ? { name }
      : {};

    const cars = await Car.find(query)
      .skip(parseInt(offset))
      // .limit(parseInt(limit))
      .lean();
    const total = await Car.countDocuments(query);

    res.json({
      data: cars,
      total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a car by ID
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).lean();
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new car
router.post("/", auth, async (req, res) => {
  try {
    let collection = db.collection("cars");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    const car = await Car.findById(result.insertedId).lean();
    res.send(car).status(201);
  } catch (e) {
    console.error(e);
  }
});

// Update a car
router.put("/:id", auth, getCar, async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a car
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Deleted Car", car: deletedCar });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
