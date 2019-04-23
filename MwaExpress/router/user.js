const express = require('express');
const router = express.Router();


const user = require('../controller/user');

router.get('/gettest', user.gettest);




module.exports = router;