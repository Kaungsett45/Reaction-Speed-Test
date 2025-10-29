const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = 'leaderboard.json';

// Initialize empty file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]');
}

// Test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Reaction Speed Test API is running!' });
});

// Get leaderboard
app.get('/api/scores', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const sorted = data.sort((a, b) => a.bestTime - b.bestTime).slice(0, 10);
    res.json(sorted);
  } catch (error) {
    res.json([]);
  }
});

// Post new score
app.post('/api/scores', (req, res) => {
  try {
    const { id, name, time, image } = req.body;
    
    if (!id || !time) {
      return res.status(400).json({ error: 'Missing id or time' });
    }

    let data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    let player = data.find(p => p.id === id);

    if (player) {
      player.testCount += 1;
      if (time < player.bestTime) {
        player.bestTime = time;
      }
      if (name) player.name = name;
      if (image) player.image = image;
    } else {
      data.push({
        id,
        name: name || 'Guest',
        image: image || '',
        bestTime: time,
        testCount: 1
      });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});