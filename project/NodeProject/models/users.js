const mongoose = require('mongoose');

const UsersSchema=new mongoose.Schema({
    idNumber: String,
    firstName: String,
    lastName: String,
    emailAddress: String, 
    phone: String,
    password:String
});

module.exports=mongoose.model('User',UsersSchema);