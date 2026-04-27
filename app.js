require('dotenv').config();

const express = require('express');
const path = require('path');

const port = process.env.PORT || 9000;

const db = require('./config/db');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', require('./routes/movieRoutes'));

app.listen(port, (err) => {
    if (err) {
        console.log("Error starting server...");        
    } else {
        console.log(`🚀 Server running at http://localhost:${port}`);
    }
});
