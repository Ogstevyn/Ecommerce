const express = require("express");
const mongoose = require("mongoose");
const User = require("./src/models/User");
require("dotenv").config();

const app = express();

//db connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
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
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password,
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
