//Loading fs, path, express, bodyParser helper
const fs = require('fs');
const path = require('path');
const express = require('express');
const notes = require('./db/db.json');

//Create instance of express to serve endpoints
const app = express();

const PORT = process.env.PORT || 3000;

//Middleware Functions
app.use(express.static(`${__dirname}/public`));     //Setting static folder to read client-side public files
app.use(express.json());                             //Configure express instance with some body-parser settings
app.use(express.urlencoded({ extended: true }));     //including handling JSON data

//handle various routes
//passes  instances of express, app and the node file system, fs into the routes
// const routes = require('./routes/routes.js')(app, fs);


//Route for index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

//Route for notes.html
app.get(`/notes`, (req, res) => res.sendFile(path.join(__dirname,'/public/notes.html')));

//Route for GET /api/notes
app.get('/api/notes', (req, res) => {

   res.json(notes);
});

// Route for single note - for display on right side
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


//Route for POST /api/notes
app.post('/api/notes', (req, res) => {
    const newnote = req.body;

    console.log(newnote);

    notes.push(newnote);

    res.json(newnote);
})

//Route for DELETE
// app.delete('/api/notes/:id', (req, res) => {
//     //look up note title; if doesn't exist return 404
//     console.log(req.body);

//     console.log(JSON.parse({ id }));
    // const deletenote = notes.find(note => note.title === req.params.title);

    //  console.log(req.params.title);
    // if (!deletenote) return res.status(404).send('There was an issue deleting the requested note');

    // //delete the note
    // const index = notes.indexOf(note);
    // notes.splice(index,1);

    // //return the deleted note
    // res.send(note);
// })




app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));