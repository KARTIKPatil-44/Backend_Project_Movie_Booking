const showService = require("../Services/show.service");
const {successResponseBody,errorResponseBody} = require("../utils/responseBody");
const {STATUS} = require("../utils/constants");
const Theatre = require("../models/theatre.model");
const Show = require("../models/show.model");
const User = require("../models/user.model");

const create = async(req, res) =>{
    try{
        const user = await User.findById(req.user);
        if (!user) {
            errorResponseBody.err = "User not found";
            return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
        }
        if (user.userRole === "CLIENT") {
            const theatre = await Theatre.findById(req.body.theatreId);
            if (!theatre) {
                errorResponseBody.err = "Theatre not found";
                return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
            }
            if (theatre.owner.toString() !== req.user) {
                errorResponseBody.err = "You are not authorized to schedule shows for this theatre";
                return res.status(STATUS.FORBIDDEN).json(errorResponseBody);
            }
        }
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
        const user = await User.findById(req.user);
        if (!user) {
            errorResponseBody.err = "User not found";
            return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
        }
        if (user.userRole === "CLIENT") {
            const show = await Show.findById(req.params.id);
            if (show) {
                const theatre = await Theatre.findById(show.theatreId);
                if (theatre && theatre.owner.toString() !== req.user) {
                    errorResponseBody.err = "You are not authorized to delete showtimes for this theatre";
                    return res.status(STATUS.FORBIDDEN).json(errorResponseBody);
                }
            }
        }
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
        const user = await User.findById(req.user);
        if (!user) {
            errorResponseBody.err = "User not found";
            return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
        }
        if (user.userRole === "CLIENT") {
            const show = await Show.findById(req.params.id);
            if (show) {
                const theatre = await Theatre.findById(show.theatreId);
                if (theatre && theatre.owner.toString() !== req.user) {
                    errorResponseBody.err = "You are not authorized to update showtimes for this theatre";
                    return res.status(STATUS.FORBIDDEN).json(errorResponseBody);
                }
            }
        }
        const responce = await showService.updateShow(req.params.id, req.body);
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

const getShowById = async (req, res) => {
    try {
        const response = await showService.getShowById(req.params.id);
        successResponseBody.message = "Successfully fetched the show details";
        successResponseBody.data = response;
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        if (error.err) {
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
    getShowById,
}
