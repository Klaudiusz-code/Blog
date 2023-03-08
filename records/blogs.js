const {ValidationError} = require("../utils/error");

class Blogs {
    constructor(obj) {
        const {id,name,title,longDesc,img} = obj;
        if (!name || typeof name !== 'string' || name.length < 3){
            throw new ValidationError('Imię musi być tekstem o długości minimum 3 znaków')
        }
        if (!title){
            throw new ValidationError('Wypełnij tytuł')
        }
        if (!longDesc){
            throw new ValidationError('Wypełnij tytuł')
        }
       if (!img){
           throw new ValidationError('Dodaj obrazek')
       }
        this.id = id;
        this.name = name;
        this.title = title;
        this.longDesc = longDesc
        this.img = img;
    }
}

module.exports = {
    Blogs,
}