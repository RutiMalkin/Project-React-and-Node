
const Task = require('../models/tasks')
//הוספת משימהV
exports.addTask=async(req,res) => {
    const newTask =await Task.create(req.body);
    res.json(newTask);
};

//הצגת כל המשימותV
exports.getAllTasks=async(req,res) => {
    try{
        const tasks= await Task.find();
        res.json(tasks);
    }catch(error){
        console.error('Failed to get tasks:', error);
        res.status(500).json({ message: 'Failed to get tasks' });
    }
};

//הצגת כל המשימות לעובד מסוייםV
exports.getAllTasksById= async (req, res) => {
    const { userTaskID } = req.params;
    console.log("user",userTaskID );
    try {
      const tasks = await Task.find({ "userTaskID":userTaskID});
      if (!tasks) {
        return res.status(404).json({ message: 'Tasks not found' });
      }
      res.json(tasks);
    } catch (error) {
      console.error('Failed to get tasks:', error);
      res.status(500).json({ message: 'Failed to get tasks' });
    }
  };

//מחיקת משימה לפי id v
exports.deleteTaskById = async (req, res) => {
    const {taskId} = req.params;
    console.log("id", taskId);
    try {
        const deletedTask = await Task.findOneAndDelete({ taskId: taskId });
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Failed to delete task:', error);
      res.status(500).json({ message: 'Failed to delete task' });
    }
  };

//עדכון משימה לפי id v
exports.updateTaskById=async(req,res) => {

    const {taskId} = req.params;
    const {dedline}=req.body;
    console.log("id ",taskId);
    try{
      const updatedTask=await Task.findOneAndUpdate(
        {taskId:taskId},
        {dedline},
        {new:true}
      );
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
    }
    catch(error){
      console.error('Failed to update task:', error);
      res.status(500).json({ message: 'Failed to update task' });
    }
    }
    
    


