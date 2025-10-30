import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors({
  origin: "https://reactiontest32.netlify.app",
}));
app.use(bodyParser.json());

//  Supabase setup
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

//  POST: Add new score
app.post("/leaderboard", async (req, res) => {
  const { name, score } = req.body;
  const { data, error } = await supabase
    .from("leaderboard")
    .insert([{ name, score }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// GET: Fetch leaderboard (top 100)
app.get("/leaderboard", async (req, res) => {
  const { data, error } = await supabase
    .from("leaderboard")
    .select("*")
    .order("score", { ascending: true })
    .limit(100);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000"));
