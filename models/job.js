/** *************************************************************************************
 * File name: job.js
 * 
 * This file creates Job schema 
 ************************************************************************************** */

// Import dependencies
const mongoose = require('mongoose');

const {
 Schema
} = mongoose;


// Create fields for the 'JobPortalSchema' collection
const JobPortalSchema = new Schema({

 jobTitle: { // indeed dice
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
 salary: { // indeed
   type: String,
   default: 'Unavailable'
 },
 location: { // indeed dice
   type: String,
   default: 'Unavailable'
 },
 company: { // indeed dice
   type: String,
   default: 'Unavailable'
 },
 link: {
   type: String,
   default: 'Unavailable'
 },
 description: { // indeed dice
   type: String,
   default: 'Unavailable'
 },
 posted: { // dice
   type: String,
   default: 'Unavailable'
 },
 dateAdded: {
   type: Date,
   default: Date.now
 }
});


// Export "jobs" table
module.exports = mongoose.model("jobs", JobPortalSchema);
