// imports packages
const express = require('express');
const path = require('path');
const fs = require('fs');

// gets db.json
const termData = require('./db/db.json');
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


app.get('/api/notes', (req, res) => res.json(termData));

app.post('api/notes', (res, req) => {

})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);