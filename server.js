// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is up and running on localhost:${port}`);
});

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/project-data", (req, res) => {
  res.json({
    success: true,
    data: projectData,
  });
});
app.post("/project-data", (req, res) => {
  const { body } = req;
  if (
    !("temperature" in body) ||
    !("date" in body) ||
    !("userResponse" in body)
  ) {
    res.status(400).json({
      success: false,
      error: "temperature, date and userResponse expected in request body",
    });
  }

  for (const prop in body) {
    projectData[prop] = body[prop];
  }
  res.json({
    success: true,
    data: projectData,
  });
});
