const express = require('express');
const router = express.Router();

const ctrl = require('../controller/movie-manager');
router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', ctrl.add);
router.delete('/:id', ctrl.delete);
router.put('/:id', ctrl.update);

module.exports = router;