const Employee = require('../models/employee');
const RollUp = require('../models/rollUp');

exports.getDetailToCheckIn = (req, res, next) => {
    const employeeId = req.params ? req.params.employeeId : null;
    console.log(employeeId)
    Employee.findById(employeeId).then(employee => {
        // unworking employee is allowed to checkout in
        RollUp.getWorkingStatusById(employeeId).then(lastCheckin => {
            console.log(lastCheckin)
            if(lastCheckin && lastCheckin.endTime){
                const currentDate = new Date();
                res.render('employee/employee-rollup', {
                    employee: employee,
                    rollUpData: {
                        startTime: (new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000).toISOString()).slice(0, 16)
                    },
                    pageTitle: 'Employee Checkin',
                    path: req.originalUrl,
                    state: 'checkin'
                })
            }
            else{
                next({status: 400, messageCode: 'NeedCheckOutFirst', errorMessage: 'Nothing'})
                // throw new Error('BROKEN');
            }
        }).catch(err => console.log(err))
    })
}

exports.postDetailToCheckIn = (req, res, next) => {
    const employeeId = req.params ? req.params.employeeId : null;
    const body = req.body;
    
    const rollUp = new RollUp(employeeId, body.workPlace, true, new Date(body.startTime), null, null);
    rollUp.save().then(result => {
        res.redirect('/admin/employees');
    }).catch(err => console.log(err));
}

exports.getDetailToCheckOut = (req, res, next) => {
    const employeeId = req.params ? req.params.employeeId : null;
    Employee.findById(employeeId).then(employee => {
        //Check if this employee has checkin without checking out => working employee is allowed to checkout out
        RollUp.getWorkingStatusById(employeeId).then(lastCheckin => {
            if(lastCheckin){
                const currentDate = new Date();
                const startTime = lastCheckin.startTime;
                console.log(lastCheckin.startTime)
                res.render('employee/employee-rollup', {
                    employee: employee,
                    rollUpData: {
                        startTime: (new Date(startTime.getTime() - startTime.getTimezoneOffset() * 60000).toISOString()).slice(0, 16),
                        endTime: (new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000).toISOString()).slice(0, 16)
                    },
                    pageTitle: 'Employee Checkout',
                    path: req.originalUrl,
                    state: 'checkout'
                })
            }
        })
    })
}

exports.postDetailToCheckOut = (req, res, next) => {
    const employeeId = req.params ? req.params.employeeId : null;
    const body = req.body;
    
    const rollUp = new RollUp(employeeId, body.workPlace, true, new Date(body.startTime), new Date(body.endTime), null);
    rollUp.save().then(result => {
        res.redirect('/admin/employees');
    }).catch(err => console.log(err));
}