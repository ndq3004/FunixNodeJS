const path = require('path');

const express = require('express');

const authController = require('../controllers/auth');
    
route = express.Router();

//GET
route.get('/login', authController.getLogin)

//POST
route.post('/login', authController.postLogin)
route.get('/logout', authController.getLogout)

module.exports = route