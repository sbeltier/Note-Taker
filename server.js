// Global Variables
const express = require('express');
const fs = require('fs')
const note_database = require('./Develop/db/db.json');
const PORT = 3000;
const app = express();
const path = require('path');
const uuid = require('uuid');

// Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));


/* * *
 * *
 * HTML Routes
 * *
 * * */

// GET request to serve notes.html on client
app.get('/notes', (req, res) => {
  // Send a message to the client
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
})



/* * *
 * *
 * API Routes
 * *
 * * */

// Get Notes from note_database
app.get('/api/notes', (req, res) => {
  console.log('entering GET /api/notes')
  res.sendFile(path.join(__dirname, './Develop/db/db.json'))
  console.log(req.body)
});


// POST request:
app.post('/api/notes', (req, res) => {
  console.log('entering POST /api/notes')
  console.log(`Added to database: ${req.body}`) 
  // console.log(req)       no do this
  // Read the notes stored in database
  const notes = JSON.parse(fs.readFileSync('./Develop/db/db.json'))
  const addNotes = req.body
  
  // Creates a unique ID for note
  addNotes.id = uuid.v4()
  notes.push(addNotes)

  // Write new files to the database
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes))
  res.json(notes)

  // // Returns notes from database to /notes page
  // res.json(note_database);
});

// Default Path...
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

// Listen for Port  
app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})