const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5050;
const DATA_FILE = './db.json';

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Read leaderboard data
app.get('./src/components/_common/leaderboard', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// Update points (Increment or Decrement)
app.post('/update-points', (req, res) => {
  const { name, change } = req.body;
  let data = JSON.parse(fs.readFileSync(DATA_FILE));

  data = data.map((user) =>
    user.name === name ? { ...user, points: user.points + change } : user
  );

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ success: true, data });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
