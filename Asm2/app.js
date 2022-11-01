const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)
const MONGO_DB_URI = require('./config').mongoDBUri;

const app = express();

const store = new MongoDBStore({
  uri: MONGO_DB_URI,
  collection: 'sessions',
  databaseName: 'funix'
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const employeeRoutes = require('./routes/employees');
const employeeApis = require('./routes/api/employees');
const authRoutes = require('./routes/auth')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }))

// app.use((req, res, next) => {

// });


app.use('/admin', employeeRoutes);
app.use('/api/admin', employeeApis);
app.use('/', authRoutes);

//set default
app.get('/', (req, res, next) => {
  res.redirect('/admin/employees')
})

app.use(errorController.get404);
app.use((err, req, res, next) => {
  console.log('this is error handler', err)
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.send(err)
})

mongoConnect(() => {
  app.listen(3000);
});
