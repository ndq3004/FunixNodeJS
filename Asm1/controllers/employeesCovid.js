const Employee = require('../models/employee');
const EmployeeCovid = require('../models/employeeCovid');
const roleData = require('../util/roleData').roleData;

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
      console.log('covidData',covidData)
      render(employee, covidData)
    })
  }).catch(er => console.log(er))
};


exports.addEmployeeCovidDetail = (req, res, next) => {
  req.body.role = roleData.find(r => r.roleId == req.body.role);
  console.log(req.body)
  const body = req.body;

  // const employeeCovid = new EmployeeCovid(
  //   body.employeeId, 
  //   body.fromDate, 
  //   body.toDate, 
  //   body.numOfVaccins, 
  //   body.numOfInfection,)
  //   employeeCovid.save().then(result => {
  //   res.redirect('/admin/employees')
  // }).catch(err => console.log(err));
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