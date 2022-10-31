const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const employeeRoutes = require('./routes/employees');
const employeeApis = require('./routes/api/employees');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5baa2528563f16379fc8a610')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});


app.use('/admin', employeeRoutes);
app.use('/api/admin', employeeApis);

//set default
app.get('/', (req, res, next) => {
  res.redirect('/admin/employees')
})

app.use(errorController.get404);
app.use((err, req, res, next) => {
  console.log('this is error handler')
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.send(err)
})

mongoConnect(() => {
  app.listen(3000);
});
