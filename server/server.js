// server/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: ['http://localhost:5173', 'https://match-pulse.vercel.app'], // frontend URLs
  methods: ['GET'],
};

app.use(cors(corsOptions));


// Endpoint to get upcoming soccer matches
app.get("/api/matches", async (req, res) => {
  try {
    const response = await axios.get("https://api.football-data.org/v4/matches", {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching matches:", error.message);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
