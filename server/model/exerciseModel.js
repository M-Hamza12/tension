const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    exercises : [
       {
        name  : {
            type : String,
            required : [true , 'Exercise must have a name']
        },
        equipment  : {
            type : String,
            required : [true , 'Exercise must have a equipment']
        },
        target  : {
            type : String,
            required : [true , 'Exercise must have a target']
        },
        gifUrl  : {
            type : String,
            required : [true , 'Exercise must have a gifUrl']
        },
        bodyPart  : {
            type : String,
            required : [true , 'Exercise must have a bodyPart']
        },
        sets : {
            type : Number,
            required : [true, 'Exercise must have sets'],
            min : 1,
        },
        reps : {
            type : Number,
            required : [true, 'Exercise must have reps'],
            min : 1,
        }
       }
    ],
    day : {
        type : String,
        required : [true, 'Exercise must have day'],
        enum : ['Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday']
    },
    title : {
        type : String,
        required : [true, 'Exercise must have title']
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : [true,'User is not logged in ']
    }
})
const Exercise = mongoose.model('Exercise',exerciseSchema);

module.exports = Exercise