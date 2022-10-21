const express = require('express');
const hiringManagerController = require('../controllers/hiringManager.controller');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();


router.route('/')
    .get( hiringManagerController.getAllJobsHiringManager)


router.route('/:id')
    .get(verifyToken, hiringManagerController.getJobHiringManagerById)




module.exports = router;