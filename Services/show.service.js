const Show = require("../models/show.model");
const Theatre = require("../models/theatre.model");
const Booking = require("../models/booking.model");
const {STATUS, BOOKING_STATUS} = require("../utils/constants");


const createShow = async (data) =>{
    try{
        const theatre = await Theatre.findById(data.theatreId);
        if(!theatre){
            throw {
                err: "No theatre found",
                code: STATUS.NOT_FOUND
            }
        }
        if (!theatre.movies.some(id => id.toString() === data.movieId.toString())) {
            throw {
                err: "Movie is currently not available in the requested theatre",
                code: STATUS.NOT_FOUND
            }
        }
        const responce = await Show.create(data);
        return responce;
    }catch(error){
        if(error.name == "ValidationError"){
            let err = {};
            Object.keys(error.errors).forEach(key =>{
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: STATUS.UNPROCESSABLE
            }
        }
        throw error;
    }
}

const getShows = async(data)=>{
    try{
        let filter = {};
        if(data.theatreId){
            filter.theatreId = data.theatreId;
        }
        if(data.movieId){
            filter.movieId = data.movieId;
        }
        const responce = await Show.find(filter);
        return responce;
        if(!responce){
            throw{
                err: "No shows found",
                code: STATUS.NOT_FOUND
            }
        }
    }catch(error){
        throw error
    }
}

const deleteShow = async(id) =>{
    try {
        const responce = await Show.findByIdAndDelete(id);
        if(!responce){
            throw {
                err: "No show found",
                code: STATUS.NOT_FOUND
            }
        }
        return responce;
    } catch (error) {
        throw error
    }
}

const updateShow = async(id, data)=>{
    try{
        const responce = await Show.findByIdAndUpdate(id, data,{
            new: true,
            runValidators: true
        });
        if(!responce){
            throw {
                err: "No shows found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return responce;
    }catch(error){
        if(error.name == "ValidationError"){
            let err = {};
            Object.keys(error.errors).forEach(key =>{
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: STATUS.UNPROCESSABLE
            }
        }
        throw error;
    }
}

const getShowById = async (id) => {
    try {
        const response = await Show.findById(id);
        if (!response) {
            throw {
                err: "No show found for the given id",
                code: STATUS.NOT_FOUND
            };
        }
        
        // Find bookings for this show
        const bookings = await Booking.find({
            theatreId: response.theatreId,
            movieId: response.movieId,
            timing: response.timing,
            status: { $in: [BOOKING_STATUS.SUCCESSFUL, BOOKING_STATUS.PROCESSING] }
        });

        // Collect all booked seats
        let bookedSeats = [];
        bookings.forEach(b => {
            if (b.seats && Array.isArray(b.seats)) {
                bookedSeats = bookedSeats.concat(b.seats);
            }
        });

        // Convert Mongoose document to plain object so we can add properties
        const showObj = response.toObject();
        showObj.bookedSeats = bookedSeats;

        return showObj;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createShow,
    getShows,
    deleteShow,
    updateShow,
    getShowById,
}