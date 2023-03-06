const {readFile, writeFile} = require('fs').promises;
const {join} = require('path');
const {v4: uuid} = require('uuid');
const {json} = require("express");

class Db{
    constructor(dbFileName) {
        this.dbFileName = join(__dirname, '../data',dbFileName);
        this.load()
    }
    async load(){
        this.data = JSON.parse(await readFile(this.dbFileName, 'utf8'))
    };
    save(){
        writeFile(this.dbFileName, JSON.stringify(this.data), 'utf8')
    };
    create(obj){
        const id = uuid();
      this.data.push({
          id: id,
          ...obj,
      });
        this.save();

        return id;
    };
    getAll(){
        return this.data;
    }
    getOne(id){
        return this.data.find(oneObj => oneObj.id === id)
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
        this.data = this.data.filter(oneObj => oneObj.id !== id);
        this.save();
    }
}

const db = new Db('db.json');


module.exports = {
    db,
}