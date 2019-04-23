const express = require('express');
const router = express.Router();

const review = require('../controller/review');

router.patch('/:id', review.reviewUpdate);


module.exports = router;