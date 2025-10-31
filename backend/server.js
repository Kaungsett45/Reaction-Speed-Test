const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: ["https://reactiontest32.netlify.app" , "http://localhost:5173", "http://localhost:5001"],
  credentials: true
}));
app.use(express.json());

//  Supabase setup
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ROLE_KEY;


const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// POST: Add new score
app.post("/api/scores", async (req, res) => {
  try {
    const { uid, name, time, image } = req.body;
    
    if (!uid || !time) {
      return res.status(400).json({ error: 'Missing uid or time' });
    }

    const { data, error } = await supabase
      .from("leaderboard")
      .insert([{ uid  , name: name || 'Guest', score: time, image}]);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ success: true });
  } catch (err) {
    console.error('POST /api/scores error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET: Fetch leaderboard (top 10)
app.get("/api/scores", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("leaderboard")
      .select("*")
      .order("score", { ascending: true })
      .limit(100);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data || []);
  } catch (err) {
    console.error('GET /api/scores error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
