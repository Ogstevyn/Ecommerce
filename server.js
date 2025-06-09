const express = require("express");
require("dotenv").config();

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
    environment: process.env.NODE_ENV,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
