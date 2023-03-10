const {readFile, writeFile, unlink} = require('fs').promises;
const {join} = require('path');
const {v4: uuid} = require('uuid');

const {Blogs} = require('../records/blogs')
const {json} = require("express");

class Db{
    constructor(dbFileName) {
        this.dbFileName = join(__dirname, '../data',dbFileName);
        this.load()
    }
    async load(){
        this.data = JSON.parse(await readFile(this.dbFileName, 'utf8')).map(obj => new Blogs(obj));
    };
    save(){
        writeFile(this.dbFileName, JSON.stringify(this.data), 'utf8')
    };
    create(obj){
        const id = uuid();
        this.data.push(new Blogs({
          id,
          ...obj,
         }));
          this.save();

            return id;
    };
    getAll(){
        return this.data.map(obj => new Blogs(obj));
    }
    getOne(id){
        return new Blogs(this.data.find(oneObj => oneObj.id === id));
    };
    update(id,newObj){
        this.data = this.data.map((oneObj) => {
           if(oneObj.id === id){
                return {
                    ...oneObj,
                    ...newObj
                }
           } else{
               return oneObj;
           }
        });
        this.save()
    }
    delete(id){
        const objToDelete = this.getOne(id);
        if (objToDelete.img) {
            unlink(join(__dirname, '../public/images', objToDelete.img))
        }
        this.data = this.data.filter(oneObj => oneObj.id !== id);
        this.save();
    }
}

const db = new Db('db.json');


module.exports = {
    db,
}