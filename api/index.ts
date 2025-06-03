// import express from 'express';
// import path from 'path';

const express = require('express');
const app = express();
const path = require('path');


//set the view engine to ejs
app.set('view engine', 'ejs');
// Serve static files from the 'public' directory
app.use(express.static(path.join('public')));


app.set('/views', path.join('/views'));

// your other routes and middleware
app.get('/', (req, res) => {
    res.render('index', {

    });
});

// app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

export default app;