const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


// middleware
app.use(express.json());
app.use(cors());


// routes
const jobRouter = require('./routes/job.route');


app.get('/', (req, res) => {
    res.send('Route is working! YAY');
});

app.use('/api/v1/jobs', jobRouter);




module.exports = app;