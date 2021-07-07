//Loading fs, path, express, uuid, and json file
const fs = require('fs');
const path = require('path');
const express = require('express');
const uuid = require('uuid');
const notes = require('./db/db.json');

//Create instance of express to serve endpoints
const app = express();

const PORT = process.env.PORT || 3000;

//Middleware Functions
app.use(express.static(`${__dirname}/public`));      
app.use(express.json());                             
app.use(express.urlencoded({ extended: true }));    

//Route for root (i.e., home page)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//Route for notes page
app.get(`/notes`, (req, res) => res.sendFile(path.join(__dirname,'/public/notes.html')));

//Route for GET /api/notes - returns all notes
app.get('/api/notes', (req, res) => res.json(notes));

// Route for GET /api/notes/:id - returns single note by ID
app.get('/api/notes/:id', (req,res) => {
    const chosen = req.params.id;

    console.log(chosen);

    for (let i = 0; i < notes.length; i++) {
        if(chosen === notes[i].title) {
        return res.json(notes[i]);
        }
    }

    return res.json(false);
})

//Route for POST /api/notes - takes user input and adds note to notes
app.post('/api/notes', (req, res) => {
    //store information to post, set the ID property
    const newnote = req.body;
    newnote.id = uuid.v4();
    console.log(newnote);

    //add the object
    notes.push(newnote);

    //return the added note
    res.json(newnote);
})



//Route for DELETE - removes note from notes by ID
app.delete('/api/notes/:id', (req, res) => {
    //look up note to delete; if doesn't exist return 404
    const deletenote = notes.find(note => note.id === parseInt(req.params.id));

    console.log(req.params.id);
    if (!deletenote) return res.status(404).send('There was an issue deleting the requested note');

    //delete the note
    const index = notes.indexOf(deletenote);
    notes.splice(index,1);

    //return the deleted note
    res.send(deletenote);
})




app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));