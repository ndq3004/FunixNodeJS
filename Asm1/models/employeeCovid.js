const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const COLLECTION_NAME = "employeeCovid"

class EmployeeCovid {
  constructor(employeeId, fromDate, toDate, numOfInjections, numOfInfections, id) {
    this.employeeId = employeeId;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.numOfInjections = numOfInjections;
    this.numOfInfections = numOfInfections;
    this._id = id ? new mongodb.ObjectId(id) : null;

    // this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection(COLLECTION_NAME)
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection(COLLECTION_NAME).insertOne(this);
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
      .collection(COLLECTION_NAME)
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
      .collection(COLLECTION_NAME)
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
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: new mongodb.ObjectId(employeeId) })
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = EmployeeCovid;
