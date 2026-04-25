const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
    nameOfInstructor:String,
    emailId:String,
    password:String,
    
})