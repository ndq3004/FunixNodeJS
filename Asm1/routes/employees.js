const path = require('path');

const express = require('express');

const adminController = require('../controllers/employees');

const router = express.Router();

// /admin/products => GET
router.get('/employees', adminController.getEmployees);

router.get('/employees/generate', adminController.generateSample);

module.exports = router;
