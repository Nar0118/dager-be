const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const carsRouter = require("./routes/cars");
const authRouter = require("./routes/auth");
const multer = require("multer");
const path = require("path");
const sendEmail = require("./services/email");

// app.use(cors(corsOptions));

const allowCrossDomain = function allowCrossDomain(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-DAOMAKER, GOOGAPPUID, X-HACKERS, X-Parse-Master-Key, X-Parse-REST-API-Key, X-Parse-Javascript-Key, X-Parse-Application-Id, X-Parse-Client-Version, X-Parse-Session-Token, X-Requested-With, X-Parse-Revocable-Session, Content-Type, Cache-control, csrf-token, user-agent"
  );
  res.header("Access-Control-Expose-Headers", "Content-Disposition");
  if ("OPTIONS" == req.method) {
    // intercept OPTIONS method
    res.sendStatus(200);
  } else {
    next();
  }
};
app.use(cors());
app.use(allowCrossDomain);

// Set storage engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init upload
const upload = multer({ storage }).single("image"); // The field name should be 'image'

// Public folder
app.use("/uploads", express.static("uploads"));

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (req.file == undefined) {
        res.status(400).send("No file selected");
      } else {
        // res.send(`File uploaded: ${req.file.path}`);
        res.json({
          fileName: req.file.filename,
          filePath: `/uploads/${req.file.filename}`,
        });
      }
    }
  });
});

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

app.post("/contact", async (req, res) => {
  const { email, message } = req.body;
  const emailTemplate = `
  <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            /* background-image: url("https://ik.imagekit.io/d7ildaprs/IMG_2040.PNG?updatedAt=1722497279651"); */
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
          }
          .header {
            /* background-color: #007BFF; */
            background-image: url("https://ik.imagekit.io/d7ildaprs/IMG_2040.PNG?updatedAt=1722497279651");
            color: #fff;
            text-align: center;
            padding: 10px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
          }
          .content {
            padding: 20px;
          }
          h1 {
            opacity: 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Dager</h1>
          </div>
          <div>
              Email: ${email}
            </div>
            <div>
              Message: ${message}
            </div>
            </div>
          </div>
        </div>
      </body>
    </html>`;

  const mailOptions = {
    to: "office.dagergermany@gmail.com",
    from: email,
    subject: "You've received a message from Dager",
    text: "Custom Email Template",
    html: emailTemplate,
  };

  try {
    await sendEmail(mailOptions);
    return res.status(200).json({ message: "Successfully sent!" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`http://www.localhost:${PORT}`);
});
