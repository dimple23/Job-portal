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
    default: 'Unavailable'
  },
  position: {
    type: String,
    default: 'Unavailable'
  },
  salary: {
    type: String,
    default: 'Unavailable'
  },
  location: {
    type: String,
    default: 'Unavailable'
  },
  company: {
    type: String,
    default: 'Unavailable'
  },
  link: {
    type: String,
    default: 'Unavailable'
  },
  description: {
    type: String,
    default: 'Unavailable'
  },
  posted: {
    type: String,
    default: 'Unavailable'
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});


//Export "jobs" table 
module.exports = mongoose.model("jobs", JobPortalSchema);
