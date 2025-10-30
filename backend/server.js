const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: "https://reactiontest32.netlify.app",
}));
app.use(bodyParser.json());

//  Supabase setup
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;


const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// POST: Add new score
app.post("/api/scores", async (req, res) => {
  const { id, name, time, image } = req.body;
  
  if (!id || !time) {
    return res.status(400).json({ error: 'Missing id or time' });
  }

  const { data, error } = await supabase
    .from("leaderboard")
    .insert([{ id, name: name || 'Guest', time, image }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
});

// GET: Fetch leaderboard (top 10)
app.get("/api/scores", async (req, res) => {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*")
    .order("time", { ascending: true })
    .limit(10);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data || []);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
