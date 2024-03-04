export function addUser(newClass) {
    return { type: 'ADD_USER', payLoad: newClass }
}

export function addTaskType(newClass) {
    return { type: 'ADD_TASK_TYPE', payLoad: newClass }
}

export function addTaskList(newClass) {
    return { type: 'ADD_TASK_LIST', payLoad: newClass }
}

export function deleteTask(newClass) {
    return { type: 'DELETE_TASK', payLoad: newClass }
}

export function updateTask(newClass) {
    return { type: 'UPDATE_TASK', payLoad: newClass }
}

export function getAllUsers(newClass) {
    return { type: 'GET_ALL_USERS', payLoad: newClass }
}

export function getAllTasks(newClass) {
    return { type: 'GET_ALL_TASKS', payLoad: newClass }
}
