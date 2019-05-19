const jwt = require('jsonwebtoken');
const mongojs = require('mongojs')
require('dotenv').config();

const User = require('../models').user;
// const Jobs = require('../models').job;
const handle = require('../utils/promise-handler');


// set up secret for JWT (json web token)...typically you'd hide this in a .env
const secret = process.env.SECRET;
console.log("secret: " + secret);




/*****************************************************************************************
 * Function: register()
 * This function is triggerend when new user tries to register him/herself to the app
 * It stores user info to the DB
 * It is used when the POST route '/api/user/register' is hit
 *****************************************************************************************/

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
  user.checkBox();


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

} //End of register()





/*****************************************************************************************
 * Function: login()
 * This function is triggerend when already registered user tries to login to the app
 * It verifies user info from the DB and fetches user data
 * It will run when user POSTs to '/api/user/login'
 *****************************************************************************************/

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

} //End of login()


/*****************************************************************************************
 * Function: getUserProfile()
 * It will run GET '/api/user' (this will be run through auth middleware)
 *****************************************************************************************/

const getUserProfile = async (req, res) => {

  console.log("Inside GET '/api/user' -> getUserProfile");

  const [userErr, userProfile] = await handle(User.findById(req._id));

  if (userErr) {
    res.status(500).json(userErr);
  } else {
    res.status(200).json(userProfile);
  }

} //End of getUserProfile()



/*****************************************************************************************
 * Function: updateUserProfile()
 * This function updates user data when user updates his/her profile page
 * It will run PUT update user '/api/user/update'
 *****************************************************************************************/

const updateUserProfile = async (req, res) => {

  console.log("Inside PUT '/api/user/update' -> updateUserProfile");
  // console.log(req.body)

  // const [userErr, userProfile] = await handle(User.findById(req._id));
  // console.log(req._id);
  // console.log(userProfile);

  // if (userErr) {
  //   res.status(500).json(userErr);
  // } else {

  //   for (let key in req.body) {
  //     userProfile[key] = req.body[key];
  //   }
  // Update the note that matches the object id
  User.update({
      _id: mongojs.ObjectId(req._id)
    }, {
      // Set the title, note and modified parameters
      // sent in the req body.
      $set: req.body
    },
    function (error, edited) {
      // Log any errors from mongojs
      if (error) {
        console.log("error" + error);
        res.send(error);
      } else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(edited);
        res.send(edited);
      }
    }
  );

  // userProfile.save(err => {
  //   console.log(userProfile)
  //   if (err) {

  //     console.log("Thos is Error" + err);
  //     res.status(500).json({
  //       success: false,
  //       message: "Error updating new data."
  //     });
  //   } else {
  //     res.status(200).json(userProfile);
  //   }
  // });
  //}

} //End of updateUserProfile()




// export our methods
module.exports = {
  getUserProfile,
  login,
  register,
  updateUserProfile
}
