import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { addUser, getAllUsers } from "../redux/action";
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, CssBaseline, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import axios from "axios";

function mapStateToProps(state) {
  return {
    usersList: state.users.usersList
  };
}

export default connect(mapStateToProps)(function Login(props) {
  const { usersList, dispatch } = props;
  const newNavigate = useNavigate();
  const defaultTheme = createTheme();

  let IDNumberRef = useRef('');
  let userFirstNameRef = useRef('');
  let userLastNameRef = useRef('');
  let userEmailAddressRef = useRef('');
  let userPhoneRef = useRef('');
  let userPasswordRef = useRef('');

  useEffect(function () {
    console.log("usersList", usersList)
  }, [, usersList]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      password: data.get('password'),
    });
  };

  const createNewUser = async () => {
    try {
      if (usersList.findIndex(x => x.idNumber == IDNumberRef.current.value) == -1 &&
        usersList.findIndex(x => x.password == userPasswordRef.current.value) == -1
        && IDNumberRef.current.value != "" && userFirstNameRef.current.value != ""
        && userLastNameRef.current.value != "" && userPasswordRef.current.value != "") {
        const newUser = {
          idNumber: IDNumberRef.current.value,
          firstName: userFirstNameRef.current.value,
          lastName: userLastNameRef.current.value,
          emailAddress: userEmailAddressRef.current.value,
          phone: userPhoneRef.current.value,
          password: userPasswordRef.current.value
        }
        const response = await axios.post('http://localhost:5000/users/', newUser);
        if (response.status == 200) {
          dispatch(addUser(newUser));
          return newNavigate("/tasksShow", { state: { idNumber: IDNumberRef.current.value, userTaskName: userFirstNameRef.current.value + " " + userLastNameRef.current.value } });
        }
      }
      else {
        alert(`User exists and cannot register or required fields are missing`);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const back = (() => {
    return newNavigate("/");
  })

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
                Sign-up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputRef={userFirstNameRef}
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="IDNumber"
                      label="ID Number"
                      name="IDNumber"
                      autoComplete="family-name"
                      inputRef={IDNumberRef}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      type="email"
                      autoComplete="family-name"
                      inputRef={userEmailAddressRef}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="phon"
                      label="Phon"
                      name="phon"
                      autoComplete="family-name"
                      inputRef={userPhoneRef}
                    />
                  </Grid>
                </Grid>
                <div style={{ display: 'flex' }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2, mr: 2, backgroundColor: 'transparent' }}
                    onClick={createNewUser}
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
})