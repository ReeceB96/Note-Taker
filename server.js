const express = require("express");
const path = require("path");
const fs = require("fs")
const db = require("./db/db.json")
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

app.get('/api/notes', (req, res) => {
    res.json(db);
  });

app.post('/api/notes', (req, res) => {
const lastId = db.length ? Math.max(...(db.map(note => note.id))) : 0;
const id = lastId + 1;
db.push( { id, ...req.body} );
res.json(db.slice(-1));
});

app.delete('/api/notes/:id', (req, res) => {
let note = db.find( ({ id }) => id === JSON.parse(req.params.id));
db.splice(db.indexOf(note), 1);
res.end("Note deleted");
});

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });