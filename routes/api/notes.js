const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');
const uuid = require('uuid');

//helper function to write files
function jsonWriter(jsobject) {
    fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(jsobject), err => {
        if (err) {
            console.log("Error writing file:", err);
        } else {
            console.log("Successfully wrote file");
        }
    });
}

//Route for GET /api/notes - returns all notes
router.get('/', (req, res) => {
    //read JSON file
    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, jsonstring) =>{
        if (err) {
            console.log("Error reading file:", err);
            return
        } 
        try {
            //parse JSON string into a JS object
            const notes = JSON.parse(jsonstring);
            console.log("Existing notes include:", notes);
            res.json(notes);
        }
        catch (err) {
            console.log("Error parsing JSON sting:", err)
        }
    })
});

//Route for POST /api/notes - takes user input and adds note to notes
router.post('/', (req, res) => {
    //store information to post, set the ID property
    const newnote = req.body;
    newnote.id = uuid.v4();

    //read JSON file
    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, jsonstring) => {
        if (err) {
            console.log("Error reading File:", err);
            return;
        }
        try {
            //parse JSON string into a JS object
            const notes = JSON.parse(jsonstring);
            
            //add the object
            notes.push(newnote);
            console.log("Saved notes:", notes);

            //write results to file
            jsonWriter(notes);

            //return notes
            res.json(notes);
        }
        catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    })
})


//Route for DELETE - removes note from notes by ID
router.delete('/:id', (req, res) => {
    //read JSON file
    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, jsonstring) => {
        if (err) {
            console.log("Error reading File:", err);
            return;
        }
        try {
            //parse JSON string into a JS object
            const notes = JSON.parse(jsonstring);

            //look up note to delete; if doesn't exist return 404
            const deletenote = notes.find(note => note.id === req.params.id);
            if (!deletenote) return res.status(404).send('There was an issue deleting the requested note');

            //delete the note
            const index = notes.indexOf(deletenote);
            notes.splice(index,1);

            //write results to file
            jsonWriter(notes);

            //return the deleted note
            res.json(deletenote);
        }
        catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    })
});

module.exports = router;