const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const cors = require('cors');
const { nanoid } = require('nanoid');

const app = express();
const adapter = new FileSync('db.json');
const db = low(adapter);

app.use(cors());
app.use(express.json());

db.defaults({ images: [] }).write();

app.get('/images', (req, res) => {
  const images = db.get('images').value();
  res.json(images);
});

// Add new image
app.post('/images', (req, res) => {
  const image = { id: nanoid(), url: req.body.url };
  db.get('images').push(image).write();
  res.status(201).json(image);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
