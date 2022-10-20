const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


// middleware
app.use(express.json());
app.use(cors());


// routes
const jobRouter = require('./routes/job.route');
const hiringManagerRouter = require('./routes/hiringManager.route');
const userRouter = require('./routes/user.route');


app.get('/', (req, res) => {
    res.send('Route is working! YAY');
});

app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/manager/jobs', hiringManagerRouter); 
app.use('/api/v1/user', userRouter);




module.exports = app;