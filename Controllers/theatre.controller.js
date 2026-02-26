const theatreServices = require('../Services/theatre.services');
const { successResponseBody, errorResponseBody} = require("../utils/responseBody")
 
const createTheatre = async(req,res)=>{
    try{
        const responce = await theatreServices.createTheatre(req.body);
        if(responce.err){
            errorResponseBody.err = responce.err;
            errorResponseBody.message = "Validation failed on few parameters of the request body"
            return res.status(responce.code).json(errorResponseBody);
        }
        successResponseBody.data = responce;
        successResponseBody.message = "Successfully created the theatre";
        return res.status(201).json(successResponseBody);
    }catch(err){
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);

    }
}

const getTheatre = async(req,res)=>{
    try{
        const responce = await theatreServices.getTheatre(req.params.id);
        if(responce.err){
            errorResponseBody.err = responce.err;
            return res.status(responce.code).json(errorResponseBody);
        }
        successResponseBody.data = responce;
        successResponseBody.message = "Successfullfy featched the data  of the theatre";
        return res.status(201).json(successResponseBody);

    }catch(error){
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    createTheatre,
    getTheatre,
}