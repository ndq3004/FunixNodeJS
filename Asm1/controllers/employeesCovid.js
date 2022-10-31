const Employee = require('../models/employee');
const EmployeeCovid = require('../models/employeeCovid');

exports.showAddEmployeeCovidDetail = (req, res, next) => {
  const employeeId = req.params.employeeId;
  const render = (employee, covidData) => {
    res.render('employee/employee-details-covid',{
      employee: employee,
      pageTitle: 'Employee Details',
      path: req.originalUrl,
      state: 'add',
      covidData: covidData || {}
    });
  }

  Employee.findById(employeeId).then((employee) =>  {
    EmployeeCovid.findById(employeeId).then(covidData => {
      render(employee, covidData)
    })
  }).catch(er => console.log(er))
};


exports.addEmployeeCovidDetail = (req, res, next) => {
  const body = req.body;
  if(body.injections && Array.isArray(body.injections.date)){
    const injections = JSON.parse(JSON.stringify(body.injections));
    body.injections = []
    for (let i = 0; i < injections.date.length; i++) {
      body.injections.push({
        date: injections.date[i],
        note: injections.note[i]
      });
    }
  }else{
    body.injections = [body.injections]
  }

  if(body.infections && Array.isArray(body.infections.fromDate)){
    const infections = JSON.parse(JSON.stringify(body.infections));
    body.infections = []
    for (let i = 0; i < infections.fromDate.length; i++) {
      body.infections.push({
        fromDate: infections.fromDate[i],
        toDate: infections.toDate[i],
        note: infections.note[i]
      });
    }
  }else{
    body.infections = [body.infections]
  }

  const employeeCovid = new EmployeeCovid(
    body.employeeId,
    body.injections, 
    body.infections
  )
  employeeCovid.save().then(result => {
    res.redirect('/admin/employees')
  }).catch(err => console.log(err));
}




//Generate 
exports.generateSample = (req, res, next) => {
  const listEmployees = [
    new Employee('Nguyen Van A', 30, 5000000, { roleId: 1, roleName: 'Employee' }, null, 'A@email.com', ''),
    new Employee('Nguyen Van B', 31, 5000000, { roleId: 1, roleName: 'Employee' }, null, 'B@email.com', ''),
    new Employee('Nguyen Van C', 34, 5000000, { roleId: 1, roleName: 'Employee' }, null, 'C@email.com', ''),
    new Employee('Nguyen Van D', 32, 5000000, { roleId: 1, roleName: 'Employee' }, null, 'D@email.com', ''),
    new Employee('Nguyen Van E', 22, 5000000, { roleId: 1, roleName: 'Employee' }, null, 'E@email.com', ''),
    new Employee('Nguyen Van F', 34, 5000000, { roleId: 2, roleName: 'Manager' }, null, 'F@email.com', ''),
    new Employee('Nguyen Van G', 27, 5000000, { roleId: 1, roleName: 'Employee' }, null, 'G@email.com', ''),
    new Employee('Nguyen Van H', 29, 5000000, { roleId: 1, roleName: 'Employee' }, null, 'H@email.com', ''),
    new Employee('Nguyen Van I', 31, 5000000, { roleId: 1, roleName: 'Employee' }, null, 'I@email.com', '')
  ]

  listEmployees.forEach(employee => {
    employee.save();
  });

  res.redirect('/admin/Employees');
}