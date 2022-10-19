const Employee = require('../models/employee');

exports.getEmployees = (req, res, next) => {
    Employee.fetchAll()
      .then(employees => {
        res.render('admin/Employees', {
          employees: employees,
          pageTitle: 'Admin Employees',
          path: '/admin/Employees'
        });
      })
      .catch(err => console.log(err));
  };

exports.generateSample = (req, res, next) => {
    const listEmployees = [
        new Employee('Nguyen Van A', 30, 5000000, {roleId: 1, roleName: 'Employee'}, null, 'A@email.com', ''),
        new Employee('Nguyen Van B', 31, 5000000, {roleId: 1, roleName: 'Employee'}, null, 'B@email.com', ''),
        new Employee('Nguyen Van C', 34, 5000000, {roleId: 1, roleName: 'Employee'}, null, 'C@email.com', ''),
        new Employee('Nguyen Van D', 32, 5000000, {roleId: 1, roleName: 'Employee'}, null, 'D@email.com', ''),
        new Employee('Nguyen Van E', 22, 5000000, {roleId: 1, roleName: 'Employee'}, null, 'E@email.com', ''),
        new Employee('Nguyen Van F', 34, 5000000, {roleId: 2, roleName: 'Manager'}, null, 'F@email.com', ''),
        new Employee('Nguyen Van G', 27, 5000000, {roleId: 1, roleName: 'Employee'}, null, 'G@email.com', ''),
        new Employee('Nguyen Van H', 29, 5000000, {roleId: 1, roleName: 'Employee'}, null, 'H@email.com', ''),
        new Employee('Nguyen Van I', 31, 5000000, {roleId: 1, roleName: 'Employee'}, null, 'I@email.com', '')
    ]

    listEmployees.forEach(employee => {
        employee.save();
    });

    res.redirect('/admin/Employees');
}