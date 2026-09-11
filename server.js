import express from 'express';
import moment from 'moment';    

const app = express();

const PORT = 3000;
const HOST = 'localhost';

app.get('/timestamp', (req, res) => {
  const now = moment();
  res.json({
    timestamp: now.format('YYYY-MM-DD HH:mm:ss')
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});