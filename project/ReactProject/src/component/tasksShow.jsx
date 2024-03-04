import React from "react";
import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import Task from "./task";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllTasks } from "../redux/action";
import AddTaskIcon from '@mui/icons-material/AddTask';

function mapStateToProps(state) {
    return {
        taskList: state.tasks.taskList,
    };
};

export default connect(mapStateToProps)(function TaskShow(props) {
    const newNavigate = useNavigate();

    const { taskList, dispatch } = props;
    const location = useLocation();

    const idNumber = location.state && location.state.idNumber;

    const userTaskName = location.state && location.state.userTaskName;

    useEffect(function () {
        console.log("taskList", taskList);
    }, [, taskList]);

    useEffect(function () {
        fetchData();
    }, []);

    const fetchData = async () => {
        debugger
        try {
            const response = await axios.get('http://localhost:5000/tasks/');
            if (response.status == 200) {
                dispatch(getAllTasks(response.data));
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const listTaskUser = taskList.filter(x => x.userTaskID === idNumber);

    const addTask = (() => {
        return newNavigate("/addTask", { state: { userTaskName: userTaskName, userTaskID: idNumber } });
    });

    if (listTaskUser.length === 0) {
        return (
            <>
                <div style={{ width: '80%', display: 'flex', direction: 'rtl', marginTop: '6%' }}><button className="addTask" onClick={addTask}>add task<AddTaskIcon /></button></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '537px', justifyContent: 'flex-end' }}>
                    <span style={{ color: 'white', fontFamily: 'cursive', fontSize: '35px' }}>No Tasks</span>
                    <div id="noTask"></div>
                </div>
            </>
        );
    }

    return (
        <>
            <div style={{ width: '80%', display: 'flex', direction: 'rtl', marginTop: '6%' }}><button className="addTask" onClick={addTask}>add task<AddTaskIcon /></button></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '14%' }}>
                {
                    listTaskUser.map(t =>
                        <p>{<Task taskId={t.taskId}></Task>}</p>)
                }
            </div>
        </>
    )

});