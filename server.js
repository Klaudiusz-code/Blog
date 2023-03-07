const express = require('express');
const hbs = require('hbs')
const methodOverride = require('method-override')
const routers = require('routers')
const {engine} = require('express-handlebars');
const {db} = require('./utils/index')
const {homeRouter} = require("./routers/home");
const {handleError} = require("./utils/error");

const app = express();

app.use(methodOverride('_method'))
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.static('public'));
app.use(express.json());
app.engine('.hbs', engine({
    extname: '.hbs',
}));
app.set('view engine','hbs');
app.use('/',homeRouter)

app.use(handleError)

const port = process.env.PORT || 3000;


app.listen(port, '127.0.0.1');