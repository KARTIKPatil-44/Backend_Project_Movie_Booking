const bookingServices = require("../Services/booking.services");
const {successResponseBody,errorResponseBody} = require("../utils/responseBody");
const {STATUS} = require("../utils/constants");

const create = async(req,res)=>{
    try{
        let userId = req.user;
        const responce = await bookingServices.createBooking({...req.body, userId: userId});
        successResponseBody.message = "Successfully  created a booking";
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

module.exports = {
    create,
}