const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/matches?status=SCHEDULED', {
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_API_KEY,
      },
    });

    res.json(response.data.matches.slice(0, 10)); // Limit to 10 upcoming matches
  } catch (error) {
    console.error('Error fetching matches:', error.message);
    res.status(500).json({ error: 'Failed to fetch match data' });
  }
});

module.exports = router;
