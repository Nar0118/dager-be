const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const carsRouter = require("./routes/cars");
const authRouter = require("./routes/auth");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoURI =
  "mongodb+srv://narekxachatryan1998:eCHu2L4x7jlrKpL4@cluster0.7zacuse.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

app.get("/", (_, res) => res.send("Server is working!"));

app.use("/api", carsRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://www.localhost:${PORT}`);
});
