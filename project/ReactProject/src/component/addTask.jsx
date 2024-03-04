import React from "react";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { addTaskList } from "../redux/action";
import Container from '@mui/material/Container';
import { Avatar, Box, Button, CssBaseline, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import axios from "axios";
import AddTaskIcon from '@mui/icons-material/AddTask';



function mapStateToProps(state) {
  return {
    taskList: state.tasks.taskList
  };
}

export default connect(mapStateToProps)(function AddTask(props) {

  const { taskList, dispatch } = props;
  const location = useLocation();
  const defaultTheme = createTheme();
  const userTaskName = location.state && location.state.userTaskName;
  const userTaskID = location.state && location.state.userTaskID;

  let taskIdRef = useRef('');
  let taskTypeIdRef = useRef('');
  let taskNameRef = useRef('');
  let taskDescriptionRef = useRef('');
  let dedlineRef = useRef('');
  const newNavigate = useNavigate();
  const [valueType, setvalueType] = useState('');


  const createNewTask = async () => {
    try {
      if (taskList.findIndex(x => x.taskId == taskIdRef.current.value) == -1 && taskIdRef.current.value != "") {

        const newTask = {
          taskId: taskIdRef.current.value,
          taskTypeId: taskTypeIdRef.current.value,
          taskName: taskNameRef.current.value,
          description: taskDescriptionRef.current.value,
          userTaskID: userTaskID,
          userTaskName: userTaskName,
          dedline: dedlineRef.current.value
        }
        console.log('newTask', newTask);
        const response = await axios.post('http://localhost:5000/tasks/', newTask);
        if (response.status == 200) {
          dispatch(addTaskList(newTask));
          console.log("taskList", taskList);
          return newNavigate("/tasksShow", { state: { idNumber: userTaskID, userTaskName: userTaskName } });
        }
      }
      else {
        alert(`There's a task with an ID ${taskIdRef.current.value} Or didn't put an ID on the task ,if you want To add the task, you must change the ID `);
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      password: data.get('password'),
    });
  };

  const back = () => {
    return newNavigate("/tasksShow", { state: { idNumber: userTaskID, userTaskName: userTaskName } });
  }

  const handleChange = (event) => {
    setvalueType(event.target.value);
  };

  return (
    <>
      <div style={{ marginTop: '20%', color: 'white' }}>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'white'
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'transparent' }}>
                <AddTaskIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add Task
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      style={{ color: 'white' }}
                      autoComplete="given-name"
                      name="IDTask"
                      required
                      fullWidth
                      id="IDTask"
                      label="ID Task"
                      autoFocus
                      inputRef={taskIdRef}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputRef={taskNameRef}
                      required
                      fullWidth
                      id="nameTask"
                      label="Name Task"
                      name="nameTask"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputRef={taskDescriptionRef}
                      required
                      fullWidth
                      id="descriptionTask"
                      label="Description Task"
                      name="descriptionTask"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputRef={dedlineRef}
                      required
                      fullWidth
                      name="Dedline"
                      label="Dedline"
                      type="date"
                      id="Dedline"
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <FormControl sx={{ m: 2, minWidth: 400 }} >
                  <InputLabel id="demo-simple-select-helper-label">Type Task</InputLabel>
                  <Select
                    inputRef={taskTypeIdRef}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={valueType}
                    label="Type_Task"
                    onChange={handleChange}
                  >
                    <MenuItem value={"homework"}>homework</MenuItem>
                    <MenuItem value={"project"}>project</MenuItem>
                    <MenuItem value={"test"}>test</MenuItem>
                    <MenuItem value={"lerning to test"}>lerning to test</MenuItem>
                  </Select>
                </FormControl>
                <div style={{ display: 'flex' }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2, mr: 2, backgroundColor: 'transparent' }}
                    onClick={createNewTask}
                  >
                    submit
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2, backgroundColor: 'transparent' }}
                    onClick={back}
                  >
                    back
                  </Button></div>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </>
  )
});
