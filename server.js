// imports packages
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

// gets db.json
let noteData = require('./db/db.json');
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// gets the notes data from db.json
app.get('/api/notes', (req, res) => res.json(noteData));

// posts new notes to db.json
app.post('/api/notes', (req, res) => {
  let createNote = {
    id: uniqid(),
    title: req.body.title,
    text: req.body.text
  };

  noteData.push(createNote);
  res.json(200);

  fs.writeFile(
    path
      .join(__dirname, 'db', 'db.json'),
      JSON.stringify(noteData), err => {
        if (err) {
          res.json (createNote);
        }
  })
})

// deletes notes of selected id
app.delete('/api/notes/:id', (req, res) => {
  // noteData = noteData.filter(noteData => noteData.id !== req.params.id);
  noteData = noteData.filter( noteData => noteData.id !== req.params.id);
  res.json(noteData);

  fs.writeFile(
    path
      .join(__dirname, 'db', 'db.json'),
      JSON.stringify(noteData), err => {
        if (err) {
          res.json (createNote);
        }
  })
})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
