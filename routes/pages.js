const express = require('express');
const routepage = express.Router();
const path = require('path');


//Route for root (i.e., home page)
routepage.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

//Route for notes page
routepage.get(`/notes`, (req, res) => res.sendFile(path.join(__dirname,'../public/notes.html')));

module.exports = routepage;