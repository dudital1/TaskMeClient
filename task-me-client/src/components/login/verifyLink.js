import React from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

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

const VerifyLink = () => {
    const classes = useStyles();
    let history = useHistory();
    let {token} = useParams();
    const verify = () => {
        console.log(token)
        axios.post('https://enigmatic-spire-75482.herokuapp.com/auth/email-activate', {
            token: token
        }).then((response => {
            history.push('/');
        }))
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VerifiedUserIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    TaskMe - Account Verification
                </Typography>
                <br/>
                <Typography variant="body2" color="textSecondary" component="p">
                The world's best task tracker.<br/>
                You are going to be way more productive from now.<br/>
                Verify your email to join the TaskMe community.<br/>
                </Typography>
                    <Button
                        onClick={verify}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Click Me To Join
                    </Button>
                <br/>
            </div>
        </Container>
    )
}
export default VerifyLink;