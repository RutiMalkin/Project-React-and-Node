const express = require('express');
const router = express.Router();
const {updateTaskById,deleteTaskById,getAllTasks,addTask,getAllTasksById} = require('../Controller/tasks');

router.get('/',getAllTasks);
router.post('/',addTask);
router.post('/:taskId',updateTaskById);
router.delete('/:taskId',deleteTaskById);
router.get('/:userTaskID',getAllTasksById);

module.exports = router;