const mongoose = require('mongoose');

const typeTaskSchema=new mongoose.Schema({
    taskTypeId:String,
    taskTypeName:String
});

module.exports=mongoose.model('typeTask',typeTaskSchema);