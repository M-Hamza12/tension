const express = require('express');
const router = express.Router();

const exercisController = require('./../controller/exerciseController');
const authController = require('./../controller/authController');

router.route('/addworkout').post(authController.protect,exercisController.addWorkout);

router.route('/getallworkout').get(authController.protect,exercisController.getAllWorkouts);

router.route('/deleteworkout').delete(authController.protect,exercisController.deleteWorkout);

module.exports = router;