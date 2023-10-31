  // First line is always dotenv
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// initializes express in application
const app = express();

// enables cors for all routes
app.use(cors());

app.use(bodyParser.json());

// for parsing app/json
app.use(express.json());

// serve static files from folder via express
app.use(express.static(path.join(__dirname, 'public', 'images')));

// const of videoRoutes
const videoRoutes = require("./routes/videoRoutes");
app.use('/videos', videoRoutes)

// set port
const port = process.env.PORT || 5500;

// listen for requests from client
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Press CTRL + C to stop server');
});

