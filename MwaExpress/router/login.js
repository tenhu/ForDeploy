const express = require('express');
const router = express.Router();


const ctrl = require('../controller/login');

router.post('/', ctrl.login);
router.post('/signup', ctrl.signup);
router.post('/checkusername', ctrl.checkusername);

module.exports = router;