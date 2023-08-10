const express = require('express');
const bodyParser = require('body-parser');
const routes = express.Router();

const authController = require('./../controller/authController');

routes.route('/signup').post(authController.createUser);

routes.route('/signin').post(authController.signIn);

routes.route('/overview').get(authController.protect, authController.overview);

routes
  .route('/changepassword')
  .post(
    bodyParser.json(),
    authController.protect,
    authController.changePassword
  );

module.exports = routes;
