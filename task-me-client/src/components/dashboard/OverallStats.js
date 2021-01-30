import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import axios from "axios";
import { useHistory } from "react-router-dom";
import {useEffect, useState} from 'react';


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function OverallStats() {
    let history = useHistory();
    const classes = useStyles();
    const [user , setUser ] = useState({});
    const [allTasks , setAllTasks ] = useState(null);
    

    useEffect(() => {
        axios.get("http://localhost:5500/auth/sign-in").then((response) =>{
            if(response.data.loggedIn === true){
                setUser(response.data.user);
                getAllTasks(response.data.user);
            }
            else
                history.push('/');
        })
    }, []);

    const getAllTasks = (user)=> {
        axios.post(`http://localhost:5500/api/tasks`, {
            email: user.email,
        }).then((response => {
            if(response){
                setAllTasks(response.data);
                console.log(allTasks);
            }
        }))
    }

    return (
        <React.Fragment>
            <Title>{user.name}</Title>
            <Typography component="p" variant="h4">
                {}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on 15 March, 2019
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View balance
                </Link>
            </div>
        </React.Fragment>
    );
}