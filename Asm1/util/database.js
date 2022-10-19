const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

let _db;

let dbUri = 'mongodb+srv://nguyenquan3004:30041998@clusterfunix.utiuxfg.mongodb.net/?retryWrites=true&w=majority';

const mongoConnect = callback => {
  const client = new MongoClient(dbUri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  client.connect(err => {
    if(!err){
      console.log('Connected!');
      _db = client.db('funix');
      callback();
    }else{
      console.log(err);
    }
    
  })
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
