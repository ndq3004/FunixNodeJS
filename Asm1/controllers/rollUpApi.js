const Employee = require('../models/employee');
const RollUp = require('../models/rollUp');


exports.getLastRollUp = (req, res, next) => {
    const employeeId = req.params ? req.params.employeeId : null;

    RollUp.getWorkingStatusById(employeeId).then(lastCheckin => {
        console.log(lastCheckin)
        if(lastCheckin){
            res.status(200).send(lastCheckin);
        }
        else{
            res.status(204).json({});
        }
    }).catch(err => {
        console.log(err)
        res.status(500).send("error")
    })
}

