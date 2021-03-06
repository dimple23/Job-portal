/** *************************************************************************************
 * File name: user-controller.js
 * 
 * This file imports jsonwebtoken for creating bearer token for authentication, 
 * import data from 'models' folder
 * import promise-handler from utils folder
 * and exposes 3 apis to getUserProfile, login and register the user into the app
 * Returns: all the data is returned in json format
 ************************************************************************************** */


/* eslint-disable no-underscore-dangle */

// Import dependencies
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models').user;
const handle = require('../utils/promise-handler');


// set up secret for JWT (json web token)...typically you'd hide this in a .env
const secret = process.env.SECRET;
console.log("secret: " + secret);




/** ***************************************************************************************
 * Function: register()
 * This function is triggerend when new user tries to register him/herself to the app
 * It stores user info to the DB
 * It is used when the POST route '/api/user/register' is hit
 **************************************************************************************** */

const register = (req, res) => {

  console.log("Inside POST '/api/user/register' -> register");

  // get information about user out of req.body
  const {
    email,
    password,
    firstName,
    lastName
  } = req.body;

  // console.log(email + " : " + password + " : " + firstName + " : " +  lastName);


  // create a new user
  const user = new User({
    email,
    password,
    firstName,
    lastName
  });

  // run setFullName()
  user.setFullName();

  // create/save new user (this will trigger the password creation method we set up in the User model)
  user.save(err => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Error registering new user, please try again."
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Welcome to INSPIRE !!"
      });
    }
  });

} // End of register()





/** ***************************************************************************************
 * Function: login()
 * This function is triggerend when already registered user tries to login to the app
 * It verifies user info from the DB and fetches user data
 * It will run when user POSTs to '/api/user/login'
 **************************************************************************************** */

const login = async (req, res) => {

  console.log("Inside POST '/api/user/login' -> login");

  // get email and password out of req.body
  const {
    email,
    password
  } = req.body;

  // find user based on email
  const [findUserErr, userInfo] = await handle(User.findOne({
    email
  }));

  if (findUserErr) {
    console.log(findUserErr);
    res.status(500).json({
      error: "Internal error, try again"
    });
  } else if (userInfo === null) {
    res.status(401).json({
      error: "Incorrect email!"
    })
  } else {

    // check to see if password matches user's password
    const [pwErr, same] = await handle(userInfo.isCorrectPassword(password));


    if (pwErr) {
      res.status(500).json({
        error: "Internal error please try again!"
      });
    } else if (same === false) {
      res.status(401).json({
        error: "Incorrect password!"
      });
    } else {
      // issue our JWT
      const payload = {
        _id: userInfo._id,
        email: userInfo.email
      }
      // sign jwt
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h'
      });

      // respond with web token to the front end
      res.status(200).json(token);

    }

  }

} // End of login()


/** ***************************************************************************************
 * Function: getUserProfile()
 * It will run GET '/api/user' (this will be run through auth middleware)
 **************************************************************************************** */

const getUserProfile = async (req, res) => {

  console.log("Inside GET '/api/user' -> getUserProfile");

  const [userErr, userProfile] = await handle(User.findById(req._id));

  if (userErr) {
    res.status(500).json(userErr);
  } else {
    res.status(200).json(userProfile);
  }

} // End of getUserProfile()



/** ***************************************************************************************
 * Function: updateUserProfile()
 * This function updates user data when user updates his/her profile page
 * It will run PUT update user '/api/user/update'
 **************************************************************************************** */

const updateUserProfile = async (req, res) => {

  console.log("Inside PUT '/api/user/update' -> updateUserProfile");

  console.log("-----req.body------");
  console.log(req.body);

  const [userErr, userProfile] = await handle(User.findById(req._id));

  if (userErr) {
    res.status(500).json(userErr);
  } else {


    const oldPassword = userProfile.password;
    // console.log("oldPassword: " + oldPassword + " :: " + req.body.password);

    if (oldPassword === req.body.password) {

      console.log("password NOT changed --------------------------");

      User.findByIdAndUpdate(req._id, req.body, (error, userData) => {

        if (error) {
          return res.status(500).json({
            success: false,
            message: "Error updating new data."
          });
        }
        console.log(userData);
        console.log("successfully updated data");
        res.status(200).json(userData);
      });


    } else {

      console.log("password to be changed --------------------------");

      // Update 'userProfile' object with new data from req.body
      for (const key in req.body) {
        userProfile[key] = req.body[key];
      }

      userProfile.save(err => {
        if (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Error updating new data."
          });
        } else {
          console.log("User profile data successfully saved!");
          console.log(userProfile);

          res.status(200).json(userProfile);
        }
      });

    }
  }

} // End of updateUserProfile()




// export our methods
module.exports = {
  getUserProfile,
  login,
  register,
  updateUserProfile
}
