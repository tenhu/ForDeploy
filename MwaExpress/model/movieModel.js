const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;


const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    released: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    review: {
        reviews: [
            {
                userName: { type: String, require: true,  unique:true, sparse: true },
                rate: { type: Number, require: true },
                comment: { type: String, require: true }
            }
        ]
    },
    cinema: {
        cinemas: [
            {
                cinemaName: { type: String, require: true },
                location: [{ long: {type:Number, require: true}, lat: {type:Number, require: true}}]
            }
        ]
    }, 
    type: {
        type: String,
        required : true
    },

    descripton: {
        type: String, 
        required: true 
    } 


});
movieSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Movies', movieSchema); 