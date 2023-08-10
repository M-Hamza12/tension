const Exercise = require('./../model/exerciseModel');
const APIError = require('./../Utils/APIError');
const APPError = require('./../Utils/APIError')
exports.addWorkout = async (req,resp,next) => {
    // req.body.user = req.user.id;
    const data = {exercises : req.body.exercises , title : req.body.title , day : req.body.day , user : req.user.id};
    let saved;
    if(!data || data.length === 0)
        return next(new APPError('You must provide exercises',400));
    try{
        saved = await Exercise.create(data);
    }
    catch(error)
    {
        return next(error);
    }
    resp.status(200).json({
        status : 'success' ,
        data : {
            data : saved
        }
    })
}
exports.getAllWorkouts = async (req,resp,next) => {
    try{
        const userId = req.user.id;
        const exerciseList = await Exercise.find({user : userId});
        resp.status(201).json({
            status : 'sucess',
            data : exerciseList
        }) 
    }catch(error){
        return next(new APIError(error.message,400));
    }
}
exports.deleteWorkout = async (req,resp,next) => {
    try{
        await Exercise.findByIdAndDelete(req.body.id);
        resp.status(204).json({
            status : 'success',
        })
    }catch(error){
        return next(error);
    }
}