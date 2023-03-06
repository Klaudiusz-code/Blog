const express = require('express');
const multer = require('multer');
const routers = require('routers')
const {db} = require("../utils");

const app = express();
const upload = multer({ storage: this.storage });

const homeRouter = express.Router();



homeRouter
    .get('/',(req,res) => {
        res.render('blogs/list-blogs',{
            blogs: db.getAll(),
        })
    })
    .get('/:id',(req, res) =>{
        res.render('blogs/view-blog',{
            blog: db.getOne(req.params.id),
        })

    })
    .post('/',(req,res) =>{
        const id = db.create(req.body);

         res.render('blogs/added',{
             title: req.body.title,
             id,
         })
    })
    .put('/:id', (req,res) => {
        db.update(req.params.id, req.body)
        res.render('blogs/modified',{
            title: req.body.title,
        })
    })
    .delete('/:id',(req,res) =>{
        db.delete(req.params.id);
        res.render('blogs/deleted')
    })
    .get('/form/add', (req,res) => {
        res.render('blogs/forms/add')
    })
    .get('/form/edit/:id', (req,res) => {
        res.render('blogs/forms/edit',{
            blog: db.getOne(req.params.id)
        })
    })

module.exports = {
    homeRouter,
}