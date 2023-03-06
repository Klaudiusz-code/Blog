const express = require('express');
const hbs = require('hbs')
const methodOverride = require('method-override')
const routers = require('routers')
const {engine} = require('express-handlebars');
const {db} = require('./utils/index')
const {homeRouter} = require("./routers/home");

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



app.listen(3000, 'localhost');