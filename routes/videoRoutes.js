const express = require("express");
const fs = require('fs');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const path = require('path');
const { generateName } = require("../helper/name");



// middleware to handle json data + cors
router.use(cors())
router.use(express.json())

const videosFilePath = path.join(__dirname, '../data/video-details.json');

// function to read the json file
function readVideosFile() {
    return JSON.parse(fs.readFileSync(videosFilePath, 'utf8'));
}

// GET /videos endpoint - responds with an array of videos
router.get('/', (req, res) => {
  try {
      const videos = readVideosFile();
      res.json(videos);
  } catch (error) {
    console.error('Error occurred in GET /videos:', error);
    res.status(500).send('Error reading video data'); 
  }
});

// GET /videos/:id endpoint - responds with object containing video details by id
router.get('/:id', (req, res) => {
  try {
      const videos = readVideosFile();
      const video = videos.find((video) => video.id === req.params.id);
      if (video) {
          res.json(video);
      } else {
          res.status(404).send('Video not found');
      }
  } catch (error) {
    console.error('Error occurred in GET /videos/:id:', error);
    res.status(500).send('Error reading video data');
  }
});

// POST /videos endpoint - Adds a new video to list with unique id
router.post('/', (req, res) => {
  try {
      const { title, description, image } = req.body;
      if (!title || !channel) {
        // bad request - need title and channel
        return res.status(400).json({
          error:
            "Please provide video title and channel for uploading a new video.",
        });
      }
    
      const videos = readVideosFile();
      const newVideo = {
          id: uuidv4(),
          title,
          channel: generateName(),
          image,
          description: description,
          views: "0",
          likes: "0",
          duration: "2:00",
          video: "https://project-2-api.herokuapp.com/stream",
          timestamp: Date.now(),
          comments:[
            {
              "id": uuidv4(),
              "name": generateName(),
              "comment": "Absolutely spot on with the emphasis on location! It’s incredible how pivotal it is for a travel experience. Your insights have inspired me; I’m now envisioning waking up to ocean waves on my next trip!",
              "likes": 4,
              "timestamp": 1631816492000
            } ,
            {
              "id": uuidv4(),
              "name": generateName(),
              "comment": "I’m so tempted to print this out for my next travel planning session, but then again, digital is the way to go! Your tips are golden; can't wait to try them out on my upcoming journey.",
              "likes": 3,
              "timestamp": 1631799181000
            },
            {
              "id": uuidv4(),
              "name": generateName(),
              "comment": "Whether it’s luxury or budget-friendly, your approach to travel accommodation is spot on! Give me a serene view and a comfortable bed over extravagant amenities any day. Excited to try this approach!",
              "likes": 2,
              "timestamp": 1631716921000
            }            
          ]
      };
      videos.push(newVideo);
      fs.writeFileSync(videosFilePath, JSON.stringify(videos, null, 2));
      res.status(201).send(newVideo);
  } catch (error) {
    console.error('Error occurred in POST /videos:', error);
    res.status(500).send('Error saving video data');
  }
});

module.exports = router;