const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Employee {
  constructor(name, age, salary, role, managerId, email, avatar, id) {
    this.name = name;
    this.age = age;
    this.salary = salary;
    this.role = role;
    this.managerId = managerId;
    this.email = email;
    this.avatar = avatar;
    this._id = id ? new mongodb.ObjectId(id) : null;

    // this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection('employees')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('employees').insertOne(this);
    }
    return dbOp
      .then(result => {
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('employees')
      .find()
      .toArray()
      .then(employees => {
        // console.log(employees);
        return employees;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(employeeId) {
    const db = getDb();
    return db
      .collection('employees')
      .find({ _id: new mongodb.ObjectId(employeeId) })
      .next()
      .then(product => {
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(employeeId) {
    const db = getDb();
    return db
      .collection('employees')
      .deleteOne({ _id: new mongodb.ObjectId(employeeId) })
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Employee;
