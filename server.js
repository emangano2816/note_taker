//Importing FS and EXPRESS
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//To read in CSS file for notes
app.use(express.static(`${__dirname}/public`));
app.use(express.json());


//Route for index.html
app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/public/index.html`, (err, data) => {
    if (err) throw err;
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(data);
  });
});

//Route for notes.html
app.get(`/notes`, (request, response) => {
  fs.readFile(`${__dirname}/public/notes.html`, (err, data) => {
    if (err) throw err;
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(data);
  })
})


app.use(express.json());
app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));