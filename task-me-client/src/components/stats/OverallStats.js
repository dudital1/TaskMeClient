import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {useEffect, useState} from 'react';

const useStyles = makeStyles({
    fragment: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto"
    },
    depositContext: {
        flex: 1,
    },
});

export default function OverallStats({tmpUser, category}) {

    const classes = useStyles();
    const user = (tmpUser);
    const [categoryLength, setCategoryLength] = useState([]);
    const [completedNumber, setCompletedNumber] = useState(null);

    const tasksByCategory = () => {
        let call = `https://enigmatic-spire-75482.herokuapp.com/api/tasks/?category=${category}`
        if (category === "All")
            call = "https://enigmatic-spire-75482.herokuapp.com/api/tasks/"
        return (
            axios.post(`${call}`, {
                email: user.email,
            }).then((response => {
                setCategoryLength(response.data.length)
                setCompletedNumber(response.data.filter(task => task.status === "Done").length)
            })))
    }
    useEffect(() => {
        tasksByCategory();
    }, []);

    return (
        <React.Fragment>
            <div className={classes.fragment}>
                <Typography component="p" variant="h4">
                    {category}
                </Typography>
                <Typography
                    variant="h5">{completedNumber ? completedNumber : "0"}/{categoryLength ? categoryLength : "0"}</Typography>
                <Typography variant="h6" color="textSecondary" className={classes.depositContext}>
                    Completed
                </Typography>
            </div>
        </React.Fragment>
    );
}