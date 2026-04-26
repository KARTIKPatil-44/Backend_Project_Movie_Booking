const showService = require("../Services/showservice");
const {successResponseBody,errorResponseBody} = require("../utils/responseBody");
const {STATUS} = require("../utils/constants");

const create = async(req, res) =>{
    try{
        const responce = await showService.createShow(req.body);
        successResponseBody.data = responce;
        successResponseBody.message = "Successfully created the show";
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getShows = async (req, res) => {
    try{
        const responce =  await showService.getShows(req.query);
        successResponseBody.message = "Successfully fetched the movie shows";
        successResponseBody.data = responce;
        return res.status(STATUS.OK).json(successResponseBody);
    }catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const destroy = async(req,res)=>{
    try {
        const responce = await showService.deleteShow(req.params.id);
        successResponseBody.message = "Successfully deleted the show";
        successResponseBody.data = responce;
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
        
    }
}

const update = async(req,res)=>{
    try {
        const responce =await showService.updateShow(req.params.id, req.body);
        successResponseBody.message = "Successfully updated the show";
        successResponseBody.data = responce;
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
        
    }
}

module.exports = {
    create,
    getShows,
    destroy,
    update,
}
