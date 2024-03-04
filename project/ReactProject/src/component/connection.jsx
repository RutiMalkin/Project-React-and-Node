import React from "react";
import { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Login from "./login";
import { Navigate, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, CssBaseline, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { Copyright, Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { getAllUsers } from "../redux/action";


function mapStateToProps(state) {
  return {
    usersList: state.users.usersList
  };
}

export default connect(mapStateToProps)(function Connection(props) {
  const { usersList, dispatch } = props;

  const newNavigate = useNavigate();
  const defaultTheme = createTheme();

  let userFirstNameRef = useRef('');
  let userLastNameRef = useRef('');
  let userPasswordRef = useRef('');
  const [flag, setFlag] = useState(false);

  useEffect(function () {
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      password: data.get('password'),
    });
  };
  const fetchData = async () => {
    debugger
    try {
      const response = await axios.get('http://localhost:5000/users/');
      if (response.status == 200) {
        dispatch(getAllUsers(response.data));
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const enter = (() => {
    debugger
    const index = usersList.findIndex(x => x.firstName == userFirstNameRef.current.value &&
      x.lastName == userLastNameRef.current.value && x.password == userPasswordRef.current.value);
    if (index != -1) {
      alert(`Hello ${userFirstNameRef.current.value} ${userLastNameRef.current.value}`);
      const id = usersList[index].idNumber;
      return newNavigate("/tasksShow", { state: { idNumber: id, userTaskName: userFirstNameRef.current.value + " " + userLastNameRef.current.value } })
    }
    else {
      alert(`There is no user named:${userFirstNameRef.current.value} ${userLastNameRef.current.value},Or one of the fields is wrong.`);
    }
    console.log("error");
  });

  if (flag) {
    return newNavigate("/login");
  }


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
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'transparent' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log-in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      inputRef={userFirstNameRef}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      inputRef={userLastNameRef}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      inputRef={userPasswordRef}
                    />
                  </Grid>
                </Grid>
                <div style={{ display: 'flex' }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2, mr: 2, backgroundColor: 'transparent' }}
                    onClick={enter}
                  >
                    login
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2, backgroundColor: 'transparent' }}
                    onClick={() => setFlag(true)}
                  >
                    sign up
                  </Button></div>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </>
  )
})