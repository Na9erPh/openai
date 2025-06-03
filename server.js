const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const users = {
  amr: {
    liveUntil: Date.now() + 60000,
    recordings: [
      { date: '2024-06-01', time: '19:00', duration: '45 دقيقة', size: '120MB', url: '/sample.mp4' },
      { date: '2024-06-02', time: '18:30', duration: '50 دقيقة', size: '130MB', url: '/sample.mp4' }
    ]
  },
  sara: {
    liveUntil: Date.now() - 1000,
    recordings: [
      { date: '2024-05-30', time: '15:00', duration: '30 دقيقة', size: '80MB', url: '/sample.mp4' }
    ]
  }
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/status/:username', (req, res) => {
  const name = req.params.username.toLowerCase();
  const user = users[name];
  if (!user) {
    return res.json({ live: false });
  }
  const live = Date.now() < user.liveUntil;
  res.json({ live });
});

app.get('/api/recordings/:username', (req, res) => {
  const name = req.params.username.toLowerCase();
  const user = users[name];
  if (!user) {
    return res.json({ recordings: [] });
  }
  res.json({ recordings: user.recordings });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
