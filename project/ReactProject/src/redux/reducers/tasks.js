import { produce } from 'immer';

const initialState = {
    taskType: [
    ],

    taskList: [
    ]
};

export default produce((state, action) => {
    switch (action.type) {
        case 'ADD_TASK_TYPE': { state.taskType.push(action.payLoad) }
            break;
        case 'ADD_TASK_LIST': { state.taskList.push(action.payLoad) }
            break;
        case 'DELETE_TASK':
            {
                const index = state.taskList.findIndex(x => x.taskId === action.payLoad.taskId)
                debugger;
                state.taskList.splice(index, 1);
            }
            break;
        case 'UPDATE_TASK':
            {
                debugger;
                const indexTask = state.taskList.findIndex(x => x.taskId == action.payLoad.taskId)
                state.taskList[indexTask].dedline = action.payLoad.dedline;
            }
            break;
        case 'GET_ALL_TASKS':
            {
                console.log(action.payLoad);
                state.taskList = action.payLoad;
            }
            break;
    }
}, initialState)
