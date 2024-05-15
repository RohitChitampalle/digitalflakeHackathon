const express = require('express');

const router = express.Router();
const multerConfig = require('../middleware/imageMiddleWare')
const {
    handleGetRole,
    handleAddNewRole,
    handleEditRole
} = require('../controller/roleBasedController');

router.get('/list', multerConfig.any(), handleGetRole).post("/add", multerConfig.any(), handleAddNewRole).put('/update/:id', multerConfig.any(), handleEditRole);



module.exports = router