const express = require('express');
const jobController = require('../controllers/job.controller');
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");
const upload = require("../middleware/upload");

const router = express.Router();


router.route('/')
    .post(verifyToken, authorization('admin', 'hiring-manager"'), jobController.createJob)
    .get( jobController.getAllJobs)


router.route('/:id/apply')
    .post(verifyToken, upload.single("resume"), jobController.applyJob)


router.route('/:id')
    .get(verifyToken, jobController.getJobById)
    .patch(verifyToken, authorization('admin', 'hiring-manager"'), jobController.updateJobById)




module.exports = router;