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

//Route for GET api/notes
app.get('/api/notes', (req, res) => {

   res.json(notes);
});



app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));