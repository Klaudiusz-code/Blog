class ValidationError extends Error{}

const handleError = (err, req, res, next) =>{
if ((err instanceof ValidationError)){
    res.status(400)
}
    res.render('layouts/error',{
        message: err instanceof ValidationError ? err.message : ' Ups coś poszło nie tak'
    })
}


module.exports = {
    handleError,
    ValidationError,
}