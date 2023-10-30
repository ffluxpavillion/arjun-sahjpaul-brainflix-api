  // First line is always dotenv
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

// enables cors for all routes
app.use(cors());

// initializes express in application
const app = express();

// for parsing app/json
app.use(express.json());

// const of videoRoutes
const videoRoutes = require("./routes/videoRoutes");
app.use('/videos', videoRoutes)

// Listen for requests from client
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Press CTRL + C to stop server');
})

