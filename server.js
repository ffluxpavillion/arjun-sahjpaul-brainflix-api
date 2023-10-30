  // First line is always dotenv
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;

// initializes express in application
const app = express();

// enables cors for all routes
app.use(cors());

// for parsing app/json
app.use(express.json());

// serve static files from folder via express
app.use('/images', express.static('public/images'));


// const of videoRoutes
const videoRoutes = require("./routes/videoRoutes");
app.use('/videos', videoRoutes)

// Listen for requests from client
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Press CTRL + C to stop server');
})

