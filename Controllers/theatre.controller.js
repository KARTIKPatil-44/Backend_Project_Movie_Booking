const theatreServices = require('../Services/theatre.services');
const { successResponseBody, errorResponseBody} = require("../utils/responseBody")
 
const createTheatre = async(req,res)=>{
    try{
        const responce = await theatreServices.createTheatre(req.body);
        successResponseBody.data = responce;
        successResponseBody.message = "Successfully created the theatre";
        return res.status(201).json(successResponseBody);

    }catch(err){
        errorResponseBody.err = err;
        return res.status(500).json(errorResponseBody);

    }
}

module.exports = {
    createTheatre,
}