var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var addUserRouter = require('./routes/addUser');
var productsRouter = require('./routes/products');
var addProductRouter = require('./routes/addProduct');
var addOrderRouter = require('./routes/addOrder');
var ordersRouter = require('./routes/orders');

var app = express();

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://127.0.0.1:27017", {
    useUnifiedTopology: true
})
    .then(client => {
        console.log("Databasen är igång");

        const db = client.db("simon-vindahl");

        app.locals.db = db;

    })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/api/users/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/users/add', addUserRouter);
app.use('/api/products', productsRouter);
app.use('/api/products/add', addProductRouter);
app.use('/api/orders/add', addOrderRouter);
app.use('/api/orders/all', ordersRouter);



module.exports = app;
