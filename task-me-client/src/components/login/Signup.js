import React, {useEffect} from 'react';
import axios from 'axios';
import {useState} from "react";
import {useHistory} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

axios.defaults.withCredentials = true;

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
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Signup = () => {
    let history = useHistory();

    const classes = useStyles();
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [nameReg, setNameReg] = useState("");

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        history.push('/');
        setOpen(false);
    };



    const register = () => {
        axios.post('https://enigmatic-spire-75482.herokuapp.com/auth/signup', {
            email: emailReg,
            password: passwordReg,
            name: nameReg,
        }).then((response => {
            handleClickOpen()
        }))
    }
    useEffect(() => {
        axios.get("https://enigmatic-spire-75482.herokuapp.com/auth/sign-in").then((response) => {
            if (response.data.loggedIn === true)
                console.log(response.data);
        })
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registeration
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        onChange={(e) => {
                            setEmailReg(e.target.value)
                        }}
                        variant="outlined"
                        margin="normal"
                        required="true"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        onChange={(e) => {
                            setNameReg(e.target.value)
                        }}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextField
                        onChange={(e) => {
                            setPasswordReg(e.target.value)
                        }}
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
                    <Button
                        onClick={register}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Register
                    </Button>
                    <Dialog
                        fullWidth={true}
                        maxWidth={'sm'}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{" Verify your email to finish signing up for TaskMe "}</DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary" variant="contained">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Grid container>
                        <Grid item>
                            <Button onClick={history.push("/")} variant="body2">
                                {"Already have an account? Sign In"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}

export default Signup;