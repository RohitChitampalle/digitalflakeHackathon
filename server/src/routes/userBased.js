const express = require('express');

const router = express.Router();

const {
    handleGetUsers,
    handleAddNewUser,
    handleEditUser
} = require('../controller/userController');

router.get('/list', handleGetUsers).post('/set', handleAddNewUser).put('/update/:id', handleEditUser);


module.exports = router