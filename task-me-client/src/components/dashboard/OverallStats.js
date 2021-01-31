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

export default function OverallStats({tmpUser, category}) {

    const classes = useStyles();
    const [user , setUser ] = useState(tmpUser);
    const [allTasks , setAllTasks ] = useState([]);
    const [categoryLength , setCategoryLength ] = useState(null);
    const [completedNumber , setCompletedNumber ] = useState(null);

    const tasksByCategory = () => {
        let call=`http://localhost:5500/api/tasks/?category=${category}`
        if (category=="All")
            call="http://localhost:5500/api/tasks/"
        return(
        axios.post(`${call}`, {
            email: user.email,
        }).then((response => {
            setAllTasks(response.data)
            setCategoryLength(response.data.length)
            setCompletedNumber(response.data.filter(task => task.status==="Done").length)
        })))
    }
    useEffect(() => {
        tasksByCategory()
    }, []);

    return (
        <React.Fragment>
            <Typography component="p" variant="h4">
                {category}
            </Typography>
            <Title>{completedNumber?completedNumber:"Loading..."}/{categoryLength?categoryLength:"Loading..."}</Title>
            <Typography component="p" variant="h4">
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                Completed
            </Typography>
        </React.Fragment>
    );
}