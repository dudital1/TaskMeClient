import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import OverallStats from './OverallStats';
import clsx from 'clsx';
import PieChart from './piChart';
import StackChart from './stackChart';


const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space_between',
        flexWrap: 'wrap'
    },
    fixedHeight: {
        height: 240,
        display: 'flex', 
        flexDirection: 'column', 
        marginBottom: '15px'
    },
}));

const Stats = () => {

    // let history = useHistory();
    const user = JSON.parse(localStorage.getItem("storageUser"));

    // const [tasks, setTasks] = useState([]);

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Paper className={classes.paper}>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <OverallStats tmpUser={user} category={"Meeting"} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <OverallStats tmpUser={user} category={"Training"} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <OverallStats tmpUser={user} category={"Education"} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <OverallStats tmpUser={user} category={"General"} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <OverallStats tmpUser={user} category={"Home"} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                <OverallStats tmpUser={user} category={"All"} />
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper>
                                <PieChart tmpUser={user}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={9}>
                            <Paper>
                                <StackChart tmpUser={user}/>
                            </Paper>
                        </Grid>
                    </Paper>
                </Grid>
            </Container>
        </main>
    );
};
export default Stats;