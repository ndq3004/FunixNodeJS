const path = require('path');

const express = require('express');

const rollUpApiController = require('../../controllers/rollUpApi');

const router = express.Router();

//GET API: get last rollup record
router.get('/employee/lastRollUp/:employeeId', rollUpApiController.getLastRollUp)


module.exports = router;
