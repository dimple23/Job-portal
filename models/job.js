const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



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
var job= mongoose.model("job",JobPortalSchema)
module.exports = job;