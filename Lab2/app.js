const http = require('http');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', (req, res, next) => {
    console.log('this is middleware');
    next();
});

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">AddProduct</button></form>');
});

app.use('/product', (req, res, next) => {
    console.log("Have added a product: ", req.body.title)
    res.redirect('/')
});

app.use('/', (req, res, next) => {
    res.send('Hello from Express');
});

const server = http.createServer(app);

server.listen(3000);
