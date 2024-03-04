import React from "react";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { updateTask, deleteTask } from "../redux/action";
import { Fab, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";


function mapStateToProps(state) {
    return {
        taskList: state.tasks.taskList
    };
}

export default connect(mapStateToProps)(function Task(props) {
    const { taskId, taskList, dispatch } = props;
    const [flag, setFlag] = useState(false);
    let dedlineRef = useRef('');

    const index = taskList.findIndex(x => x.taskId == taskId);

    useEffect(function () {
        console.log("taskList", taskList);
    }, [, taskList]);

    const delTask = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/tasks/${taskId}`);
            if (response.status == 200) {
                dispatch(deleteTask({ taskId: taskId }));
                console.log("tasklist", taskList);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const updTask = async () => {
        try {
            const newDedline = {
                dedline: dedlineRef.current.value
            }
            const response = await axios.post(`http://localhost:5000/tasks/${taskId}`, newDedline);
            if (response.status == 200) {
                setFlag(!flag);
                dispatch(updateTask({ dedline: dedlineRef.current.value, taskId: taskId }));
                console.log("taskList", taskList);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div id="task">
                <div style={{ height: "50px" }}></div>
                <label className="labelTask">task ID:</label>
                <label className="labelInputTask">{taskList[index].taskId}</label>
                <br></br>
                <label className="labelTask">task type:</label>
                <label className="labelInputTask">{taskList[index].taskTypeId}</label>
                <br></br>
                <label className="labelTask">task name:</label>
                <label className="labelInputTask">{taskList[index].taskName}</label>
                <br></br>
                <label className="labelTask">description task:</label>
                <br />
                <label style={{ marginLeft: "32px" }} className="labelInputTask">{taskList[index].description}</label>
                <br></br>
                <label className="labelTask">current user ID:</label>
                <label className="labelInputTask">{taskList[index].userTaskID}</label>
                <br></br>
                <label className="labelTask">current user name:</label>
                <label className="labelInputTask">{taskList[index].userTaskName}</label>
                <br></br>
                <label className="labelTask">dedline:</label>
                <label className="labelInputTask">{taskList[index].dedline}</label>
                <br></br>

                <IconButton style={{ marginLeft: "26px", marginTop: "11px" }} aria-label="delete" size="large" onClick={delTask}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
                <Fab aria-label="edit" onClick={() => setFlag(!flag)} style={{ backgroundColor: "transparent", boxShadow: "none", marginTop: '12px' }}>
                    <EditIcon />
                </Fab>
                {flag && < div style={{ marginTop: "-9px", marginLeft: "91px" }}>
                    <input type="date" ref={dedlineRef} style={{ backgroundColor: "transparent", borderRadius: "2px" }}></input>
                    <button onClick={updTask} style={{ borderRadius: "2px", marginLeft: "12px", backgroundColor: "transparent" }}>to change</button>
                </div>}
            </div>
        </>
    )
})
// echo "# TodoProject" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/MiriErlbaum/TodoProject.git
// git push -u origin main