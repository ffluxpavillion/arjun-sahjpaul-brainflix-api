const express = require("express");
const fs = require('fs').promises; // use fs promises for async operations
const router = express.Router();
const uuidv4 = require('uuid');
const cors = require('cors');
router.use(cors());
router.use(express.json());
const { generateRandomName } = require('../helper/name');

const videosFilePath = './data/video-details.json';

// function to read the JSON file
async function readVideosFileAsync() {
    try {
        const fileContent = await fs.readFile(videosFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading file:', error);
        throw new Error('Error reading video data');
    }
}

// function to write to the JSON file
async function writeVideosFileAsync(data) {
    try {
        await fs.writeFile(videosFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing file:', error);
        throw new Error('Error writing video data');
    }
}

router.get('/', async (req, res) => {
  try {
      const videos = await readVideosFileAsync();
      res.json(videos.map(({ comments, ...video }) => video));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
      const videos = await readVideosFileAsync();
      const video = videos.find(video => video.id === req.params.id);

      // Check if video is found, and include comments in the response
      video ? res.json(video) : res.status(404).send('Video not found');
  } catch (error) {
    res.status(500).send(error.message);
  }
});



router.post('/', async (req, res) => {
  try {
      const { title, description } = req.body;
      if (!title || !description) {
        return res.status(400).json({ error: "Please provide video title and description." });
      }

      const videos = await readVideosFileAsync();
      const newVideo = createNewVideo(req.body);
      videos.push(newVideo);
      await writeVideosFileAsync(videos);
      res.status(201).send(newVideo);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

function createNewVideo({ title, description }) {
    return {
        id: uuidv4.v4(),
        title: title,
        channel: "ChannelName",
        image: "http://localhost:8080/Upload-video-preview.jpg",
        timestamp: Date.now(),
        comments: [
          {
            "id": uuidv4.v4(),
            "name": generateRandomName(),
            "comment": "Absolutely spot on with the emphasis on location! It’s incredible how pivotal it is for a travel experience. Your insights have inspired me; I’m now envisioning waking up to ocean waves on my next trip!",
            "likes": 4,
            "timestamp": 1631816492000
          },
          {
            "id": uuidv4.v4(),
            "name": generateRandomName(),
            "comment": "I’m so tempted to print this out for my next travel planning session, but then again, digital is the way to go! Your tips are golden; can't wait to try them out on my upcoming journey.",
            "likes": 3,
            "timestamp": 1631799181000
          },
          {
            "id": uuidv4.v4(),
            "name": generateRandomName(),
            "comment": "Whether it’s luxury or budget-friendly, your approach to travel accommodation is spot on! Give me a serene view and a comfortable bed over extravagant amenities any day. Excited to try this approach!",
            "likes": 2,
            "timestamp": 1631716921000
          }
        ]
    };
}

module.exports = router;
