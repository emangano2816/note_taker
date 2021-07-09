const fs = require('fs');
const express = require('express');
const router = express.Router();
// const notes = require('../../db/db.json');
const path = require('path');
const uuid = require('uuid');

//Route for GET /api/notes - returns all notes
router.get('/', (req, res) => {

    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, jsonstring) =>{
        if (err) {
            console.log("Error reading file:", err);
            return
        } 
        try {
            const notes = JSON.parse(jsonstring);
            console.log(notes);
            res.json(notes);
        }
        catch (err) {
            console.log("Error parsing JSON sting:", err)
        }
    })
});

// Route for GET /api/notes/:id - returns single note by ID
router.get('/:id', (req,res) => {
    //retrieve and store requested id
    const chosenNote = req.params.id;
    console.log(chosenNote);

    //read JSON file
    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, jsonstring) => {
        if (err) {
            console.log("Error reading File:", err);
            return;
        }
        try {
            const notes = JSON.parse(jsonstring);
            //search notes and find requested note by id - if id exists return it
            for (let i = 0; i < notes.length; i++) {
                if(chosenNote === notes[i].title) {
                return res.json(notes[i]);
                }
            }
            return res.json(false);
        }
        catch (err) {
            console.log("Error parsing JSON sting:", err)
        }
    })


})

//Route for POST /api/notes - takes user input and adds note to notes
router.post('/', (req, res) => {
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
router.delete('/:id', (req, res) => {
    //look up note to delete; if doesn't exist return 404
    const deletenote = notes.find(note => note.id === req.params.id);

    console.log(req.params.id);
    if (!deletenote) return res.status(404).send('There was an issue deleting the requested note');

    //delete the note
    const index = notes.indexOf(deletenote);
    notes.splice(index,1);

    //return the deleted note
    res.send(deletenote);
})

module.exports = router;