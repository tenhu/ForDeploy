
const express = require('express');
const router = express.Router();

const movie = require('../controller/movie');

router.get('/:id', movie.showOneMovie);

router.get('/', movie.showMovie);
router.post('/', movie.addMovie);


module.exports = router;