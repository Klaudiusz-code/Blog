const express = require('express');
const multer = require('multer');
const routers = require('routers')
const {db} = require("../utils");

const app = express();

const homeRouter = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });


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
    .post('/',upload.single('img'),(req,res) =>{
        const id = db.create({
            ...req.body,
            img: req.file ? req.file.filename : null,
        });
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