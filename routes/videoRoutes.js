const express = require("express");
const fs = require('fs');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
import path from 'path';

// middleware to handle json data + cors
router.use(cors())
router.use(express.json())

const videosFilePath = path.join(__dirname, 'video-details.json');

// function to read the json file
function readVideosFile() {
    return JSON.parse(fs.readFileSync(videosFilePath, 'utf8'));
}

// GET /videos endpoint - responds with an array of videos
router.get('/videos', (req, res) => {
  try {
      const videos = readVideosFile();
      res.json(videos);
  } catch (error) {
      res.status(500).send('Error reading video data');
  }
});

// GET /videos/:id endpoint - responds with object containing video details by id
router.get('/videos/:id', (req, res) => {
  try {
      const videos = readVideosFile();
      const video = videos.find(v => v.id === req.params.id);
      if (video) {
          res.json(video);
      } else {
          res.status(404).send('Video not found');
      }
  } catch (error) {
      res.status(500).send('Error reading video data');
  }
});

// POST /videos endpoint - Adds a new video to list with unique id
router.post('/videos', (req, res) => {
  try {
      const { title, channel, description, duration } = req.body;
      const videos = readVideosFile();
      const newVideo = {
          id: uuidv4(),
          title: title,
          channel: channel,
          image: "https://i.imgur.com/l2Xfgpl.jpg",
          description: description,
          views: "0",
          likes: "0",
          duration: duration,
          video: "https://project-2-api.herokuapp.com/stream",
          timestamp: Date.now(),
          comments:[]
      };
      videos.push(newVideo);
      fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));
      res.status(201).send(newVideo);
  } catch (error) {
      res.status(500).send('Error saving video data');
  }
});

module.exports = router;