const express = require('express');

const router = express.Router();

const {
handleGetStatus
} = require('../controller/statusController');

router.get('/getStatus',handleGetStatus)

module.exports = router