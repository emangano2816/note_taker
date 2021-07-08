//Loading path and express
const express = require('express');

//Create instance of express to serve endpoints
const app = express();
const router = express.Router();

const PORT = process.env.PORT || 3000;


//Middleware
app.use(express.static(`${__dirname}/public`));      
app.use(express.json());                             
app.use(express.urlencoded({ extended: true }));  

app.use('/api/notes', require('./routes/api/notes'))
app.use('/', require('./routes/pages'));
  

//Listen for activity
app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));