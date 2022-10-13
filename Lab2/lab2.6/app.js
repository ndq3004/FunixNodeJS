const http = require('http');

const express = require('express');

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser');

const middleware = require('./helpers/ruoteMiddleware');
const errorHandler = require('./helpers/routeNotFound');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(middleware);

app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandler);

const server = http.createServer(app);

server.listen(3000);
