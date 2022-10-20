const express = require('express');
const jobController = require('../controllers/job.controller');

const router = express.Router();


router.route('/')
    .post(jobController.createJob)
    .get(jobController.getAllJobs)

    
router.route('/:id')
    .get(jobController.getJobById)
    .patch(jobController.updateJobById)




module.exports = router;