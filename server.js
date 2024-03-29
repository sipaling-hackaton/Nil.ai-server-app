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

app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
});
  

