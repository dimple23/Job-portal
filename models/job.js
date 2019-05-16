/***************************************************************************************
 * File name: job.js
 * 
 * This file performs exports job and user model to the rest of the app
 ***************************************************************************************/

//Import dependencies
const mongoose = require('mongoose');
const {
  Schema
} = mongoose;


//Create fields for the 'JobPortalSchema' collection
const JobPortalSchema = new Schema({

  jobTitle: {
    type: String,
    required: true
  },

  jobtype: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    default: 'Unavailable'
  },
  location: {
    type: String,
    required: true
  },
  company: {
    type: String,
    // required :true
  },

  link: {
    type: String
  },
  description: {
    type: String,
    //required: true
  },
  posted: {
    type: String
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});


//Export "jobs" table 
module.exports = mongoose.model("jobs", JobPortalSchema);