require("dotenv/config");

const express = require("express");
const cors = require("cors");

const app = express();

// constants
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

// routes
app.use("/api/auth", require("./app/routes/auth.routes.js"));

// teacher routes
app.use("/api/teacher/class", require("./app/routes/teacher/class.routes.js"));
app.use("/api/teacher/assignment", require('./app/routes/teacher/assignment.routes.js'));

// student routes

app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
});
  

