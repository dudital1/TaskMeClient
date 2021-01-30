import React, { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useState } from "react";
import { useHistory } from "react-router-dom";
///
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
axios.defaults.withCredentials = true;
const CLIENT_ID = "797191547152-h2lf9jrigv5bmc3rv4cic2ph3vr42m45.apps.googleusercontent.com";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                TaskMe - David and Saar Ltd
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
///

const Signin = () => {
    const classes = useStyles();
    let history = useHistory();

    const [emailLog, setEmailLog] = useState("");
    const [passwordLog, setPasswordLog] = useState("");

    const [loginStatus , setLoginStatus ] = useState("");

    const signIn = () => {
        axios.post(`http://localhost:5500/auth/sign-in`, {
            email: emailLog,
            password: passwordLog,
        }).then((response => {
            console.log(response.data.message)
            if(response.data.message){
                setLoginStatus(response.data.message);
            }else{
                setLoginStatus(response.data.user.name);
                history.push('/dashboard')
            }
        }))
    }
    useEffect(() => {
        axios.get("http://localhost:5500/auth/sign-in").then((response) =>{
            if(response.data.loggedIn === true){
                setLoginStatus(response.data.loggedIn);
            }
            console.log(response.data);
        })
    }, []);

    const responseSuccessGoogle = (response) => {
        axios({
            method: "POST",
            url: "http://localhost:5500/auth/googlelogin",
            data: { tokenId: response.tokenId }
        }).then(response => {
            history.push('/dashboard')
            console.log(JSON.stringify(response.data));
        })
    }

    const responseErrorGoogle = (response) => {
        console.log(response);
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        onChange={(e) => {setEmailLog(e.target.value)}}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        onChange={(e) => {setPasswordLog(e.target.value)}}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        onClick={signIn}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <br/>
                <GoogleLogin
                    clientId = {CLIENT_ID}
                    buttonText="Login With Google"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={'single_host_origin'}

                />
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default Signin;