import logo from './logo.svg';
import { Provider } from 'react-redux';
import './App.css';
import Login from "./component/login";
import Connection from "./component/connection";
import store from "./redux/store"
import Task from './component/task';
import TasksShow from './component/tasksShow';
import { render } from 'react-dom';
import { Route, Routes } from 'react-router-dom';
import AddTask from './component/addTask';


function App() {
  return (
    
    <Provider store={store}>
      <Routes>
          <Route path='/' element={<Connection/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/tasksShow' element={<TasksShow />}/>
          <Route path='/addTask' element={<AddTask/>}/>
      </Routes>
    </Provider>
  );
}

export default App;
