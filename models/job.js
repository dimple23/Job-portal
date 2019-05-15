const mongoose = require('mongoose');


const { Schema } = mongoose;


const JobPortalSchema = new Schema({
  
  title: {
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
  location: {
    type: String,
    required: true
  },
  company: {
    type: String,
   // required :true
  },
  Description: {
    type: String,
    //required: true
  }
});


module.exports = mongoose.model("jobs", JobPortalSchema);