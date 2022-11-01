const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class RollUp {
    constructor(employeeId, workPlace, isCheckin, startTime, endTime, id) {
        this.employeeId = employeeId;
        this.workPlace = workPlace;
        this.isCheckin = isCheckin;
        this.startTime = startTime;
        this.endTime = endTime;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product
            console.log(this)
            dbOp = db
                .collection('rollUp')
                .updateOne({ _id: this._id }, { $set: this });
        } else {
            dbOp = db.collection('rollUp').insertOne(this);
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
            .collection('rollUp')
            .find()
            .toArray()
            .then(rollUps => {
                return rollUps;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findByEmployeeId(employeeId) {
        const db = getDb();
        return db
            .collection('rollUp')
            .find({ employeeId: employeeId })
            .next()
            .then(rollUps => {
                return rollUps;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAllByEmployeeId(employeeId) {
        const db = getDb();
        return db
            .collection('rollUp')
            .find({ employeeId: employeeId })
            .toArray()
            .then(rollUps => {
                return rollUps;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static getWorkingStatusById(employeeId) {
        const db = getDb();
        return db
            .collection('rollUp')
            .find({ employeeId: employeeId })
            .sort({ 'startTime': -1 })
            .limit(1)
            .next()
            .then(lastCheckin => {
                return lastCheckin;
            }).catch(err => console.log(err))
    }
}

module.exports = RollUp