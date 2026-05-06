const {successResponseBody,errorResponseBody} = require("../utils/responseBody");
const {STATUS,USER_ROLE, BOOKING_STATUS} = require("../utils/constants");
const theatreService = require("../Services/theatre.services");
const userService = require("../Services/user.services");
const ObjectId = require('mongoose').Types.ObjectId;

const validateBookingCreateRequest = async(req , res, next)=>{
    // validate the theatre id presence
    if(!req.body.theatreId){
        errorResponseBody.err = "No theatre id present";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // validate correct theatre id format
    if(!ObjectId.isValid(req.body.theatreId)){
        errorResponseBody.err = "Invalid theatreid provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // check if theatre exists in database
    const theatre = await theatreService.getTheatre(req.body.theatreId);
    if(!theatre){
        errorResponseBody.err = "No theatre found for the given id";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // validate movie presence
    if(!req.body.movieId){
        errorResponseBody.err = "No movie id present";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // validate correct movie id format
    if(!ObjectId.isValid(req.body.movieId)){
        errorResponseBody.err = "Invalid movie id format";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // validate if moive is running in the theatre or not ?
   if(!theatre.movies.some(id => id.toString() === req.body.movieId)){
        errorResponseBody.err = "Given movie is not available in the requested theatre";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // validate presence of timings
    if(!req.body.timing){
        errorResponseBody.err = "No movie timing passed";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // validate no of seats presence
    if(!req.body.noOfSeats){
        errorResponseBody.err = "No seats provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    // request is correct
    next();


}

const canChangeStatus  = async(req,res,next)=>{
    const user = await userService.getUserById(req.user);
    if(user.userRole == USER_ROLE.customer && req.body.status && req.body.status !== BOOKING_STATUS.CANCELLED){
        errorResponseBody.err = "You are not allowed to change the booking status";
        return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
    }
}

module.exports = {
    validateBookingCreateRequest,
    canChangeStatus,
}