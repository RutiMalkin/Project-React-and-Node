import { produce } from 'immer';
const initialState = {
    usersList: [
    ]
};

export default produce((state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            {
                state.usersList.push(action.payLoad);
                alert(`${action.payLoad.firstName} ${action.payLoad.lastName} signed up successfully`);
            }
            break;
        case 'GET_ALL_USERS':
            {
                console.log(action.payLoad);
                state.usersList = action.payLoad;
            }
            break;
    }

}, initialState)
