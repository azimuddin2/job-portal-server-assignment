const express = require('express');
const hiringManagerController = require('../controllers/hiringManager.controller');

const router = express.Router();


router.route('/')
    .get(hiringManagerController.getAllJobsHiringManager)


router.route('/:id')
    .get(hiringManagerController.getJobHiringManagerById)




module.exports = router;