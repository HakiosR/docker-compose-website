// Import module
import express from "express";

// Define the express app
const router = express.Router();

// Define the route for the root URL
router.get("/", (req, res) => {
  res.send("Hello World! Welcome to NodeJS App1");
});