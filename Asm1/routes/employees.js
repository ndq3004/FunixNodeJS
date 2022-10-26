const path = require('path');

const express = require('express');

const employeeController = require('../controllers/employees');
const rollUpController = require('../controllers/rollUp');
const employeeCovidController = require('../controllers/employeesCovid');

const router = express.Router();

// /admin/employees => GET Employee list
router.get('/employees', employeeController.getEmployees);

// /admin/employee/details/:employeeId => GET employee details by employeeId
router.get('/employee/details/:employeeId', employeeController.getEmployeeDetails);

//Get Employee Detail to edit
router.get('/employee/edit/:employeeId', employeeController.getEmployeeDetails);
// Post Employee details
router.post('/employee/edit/:employeeId', employeeController.addOrUpdateEmployeeDetails);

//GET CheckIn 
router.get('/employee/checkin/:employeeId', rollUpController.getDetailToCheckIn);
// POST CheckIn
router.post('/employee/checkin/:employeeId', rollUpController.postDetailToCheckIn);

//GET CheckIn 
router.get('/employee/checkout/:employeeId', rollUpController.getDetailToCheckOut);
// POST CheckIn
router.post('/employee/checkout/:employeeId', rollUpController.postDetailToCheckOut);

//GET Employee-covid list
router.get('/employee/covid-details/:employeeId', employeeCovidController.showAddEmployeeCovidDetail);
router.post('/employee/covid-details/:employeeId', employeeCovidController.addEmployeeCovidDetail);

//Generate sample data
router.get('/employees/generate', employeeController.generateSample);

module.exports = router;
