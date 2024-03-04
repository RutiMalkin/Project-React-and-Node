const mongoose = require('mongoose');

const TasksSchema=new mongoose.Schema({
    taskId: String,
    taskTypeId: String,
    taskName:String,
    description:String,
    userTaskID: String,
    userTaskName: String,
    dedline: String
});


module.exports=mongoose.model('Task',TasksSchema);