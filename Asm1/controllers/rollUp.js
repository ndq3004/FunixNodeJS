const Employee = require("../models/employee");
const RollUp = require("../models/rollUp");

exports.getDetailToCheckIn = (req, res, next) => {
  const employeeId = req.params ? req.params.employeeId : null;
  Employee.findById(employeeId).then((employee) => {
    // unworking employee is allowed to checkout in
    RollUp.getWorkingStatusById(employeeId)
      .then((lastCheckin) => {
        const goToCheckinPage = function (history) {
          normalizeHistory(history);
          const currentDate = new Date();
          res.render("employee/employee-rollup", {
            employee: employee,
            rollUpData: {
              startTime: new Date(
                currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
              )
                .toISOString()
                .slice(0, 16),
            },
            rollUpHistory: history,
            pageTitle: "Employee Checkin",
            path: req.originalUrl,
            state: "checkin",
          });
        };
        if (lastCheckin) {
          if (lastCheckin.endTime) {
            RollUp.fetchAllByEmployeeId(employeeId).then(history => {
              goToCheckinPage(history);
            })
          } else {
            next({
              status: 400,
              messageCode: "NeedCheckOutFirst",
              errorMessage: "Nothing",
            });
            // throw new Error('BROKEN');
          }
        }else{
            goToCheckinPage();
        }
      })
      .catch((err) => console.log(err));
  });
};

exports.postDetailToCheckIn = (req, res, next) => {
  const employeeId = req.params ? req.params.employeeId : null;
  const body = req.body;

  const rollUp = new RollUp(
    employeeId,
    body.workPlace,
    true,
    new Date(body.startTime),
    null,
    null
  );
  rollUp
    .save()
    .then((result) => {
      res.redirect("/admin/employees");
    })
    .catch((err) => console.log(err));
};

exports.getDetailToCheckOut = (req, res, next) => {
  const employeeId = req.params ? req.params.employeeId : null;
  Employee.findById(employeeId).then((employee) => {
    //Check if this employee has checkin without checking out => working employee is allowed to checkout out
    RollUp.getWorkingStatusById(employeeId).then((lastCheckin) => {
      if (lastCheckin) {
        const currentDate = new Date();
        const startTime = lastCheckin.startTime;
        RollUp.fetchAllByEmployeeId(employeeId).then(history => {
          res.render("employee/employee-rollup", {
            employee: employee,
            rollUpData: {
              ...lastCheckin,
              startTime: new Date(
                startTime.getTime() - startTime.getTimezoneOffset() * 60000
              )
                .toISOString()
                .slice(0, 16),
              endTime: new Date(
                currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
              )
                .toISOString()
                .slice(0, 16),
            },
            rollUpHistory: history,
            pageTitle: "Employee Checkout",
            path: req.originalUrl,
            state: "checkout",
          });
        })
      }
    });
  });
};

exports.postDetailToCheckOut = (req, res, next) => {
  const employeeId = req.params ? req.params.employeeId : null;
  const body = req.body;
  console.log(body)
  const rollUp = new RollUp(
    employeeId,
    body.workPlace,
    false,
    new Date(body.startTime),
    new Date(body.endTime),
    body._id
  );
  rollUp
    .save()
    .then((result) => {
      res.redirect("/admin/employees");
    })
    .catch((err) => console.log(err));
};

function normalizeHistory(histories) {
  if(histories && histories.length > 0){
    for(let history of histories){
      console.log(history)
        if(history.startTime)
          history.startTime = history.startTime.toLocaleDateString() + ' ' + history.startTime.toLocaleTimeString();
        if(history.endTime)
          history.endTime = history.endTime.toLocaleDateString() + ' ' + history.endTime.toLocaleTimeString();
    }
  }
}
