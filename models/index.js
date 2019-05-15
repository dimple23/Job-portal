/***************************************************************************************
 * File name: index.js
 * 
 * This file performs exports job and user model to the rest of the app
 ***************************************************************************************/


module.exports = {
  job: require("./job"),
  user: require("./user")
};