
/** *************************************************************************************
 * File name: user-routes.js
 * 
 * This file collects the user routes and provides the endpoint names
 ************************************************************************************** */

// Import express.router() functionality
const router = require('express').Router();

// Import methods we exported from user-controller
const {register, login, getUserProfile, updateUserProfile } = require('../../controllers/user-controller');

// Import authentication method 
const withAuth = require('../../middleware/authentication');


// GET user profile '/api/user'
router
  .route('/')
  .get(withAuth, getUserProfile);


// POST register user '/api/user/register'
router
  .route('/register')
  .post(register);


// POST login user '/api/user/login'
router
  .route('/login')
  .post(login);

  
// PUT update user '/api/user/update'
router
  .route('/update')
  .put(withAuth,updateUserProfile);


module.exports = router;