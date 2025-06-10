const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//db connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error :", error);
    process.exit(1);
  }
};

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
    environment: process.env.NODE_ENV,
    database: "Connected to MongoDB",
  });
});

//Start Server
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`app is listening on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server: ", error);
  }
};

startServer();
