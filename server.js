// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();
// Start up an instance of app
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Initialize local port
const port = 3000;

// Setup Server
app.listen(port, () => {
  console.log('server is running');
  console.log('Run on localhost:' + port);
});
// add data to database
const postData = (req, res) => {
  projectData = req.body;
  res.send(projectData);
  console.log(projectData);
};

app.post('/add', postData);

// get data from database
const getData = (req, res) => {
  res.send(projectData);
  console.log(projectData);
};

app.get('/all', getData);
