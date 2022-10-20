const express = require('express');
const hiringManagerController = require('../controllers/hiringManager.controller');

const router = express.Router();


router.route('/')
    .post(hiringManagerController.createHiringManager)
    .get(hiringManagerController.getAllHiringManager)



router.route('/:id')
    .get(hiringManagerController.getHiringManagerById)




module.exports = router;