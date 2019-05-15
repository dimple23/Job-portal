const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const { Schema } = mongoose;


module.exports = mongoose.model('job', JobPortalSchema);
const UserSchema = new Schema({
  userid:{
    type: Integer,

  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\../, "A valid email address must be used!"]
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  fullName: {
    type: String
  },
  jobs: [
    {
      ref: "job",
      type: mongoose.Schema.Types.ObjectId,
    }
  ]
  
});




module.exports = mongoose.model('user',UserSchema );


