const express = require('express');
const path = require('path');
const { db } = require("./config/mainconfig.js");
const { DB_PORT } = process.env || "3000";

//start server 
const app = express();

//sets
app.set('views', path.join(__dirname, 'views'));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //for every frontend
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//rutas
app.use(require('./routes/router'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

// init server

db.sync()
    .then(() => {
        app.listen(DB_PORT, () => {
            console.log('Server on port ' + DB_PORT);
        });

    })
    .catch((err) => {
        console.error("Error: " + err);
    });

