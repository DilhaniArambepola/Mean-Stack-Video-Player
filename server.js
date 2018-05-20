const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// API file for interacting with MongoDB
const api = require('./server/routes/api');

const port = process.env.PORT || '3000';

const app = express();

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// Parsers
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function(){
    console.log("Server running on port "+port);
});