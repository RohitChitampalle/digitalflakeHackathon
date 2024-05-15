const express = require('express');

const router = express.Router();

const {
    handleGetRole,
    handleAddNewRole
} = require('../controller/roleBasedController');

router.get('/list', handleGetRole).post("/add", handleAddNewRole)


module.exports = router