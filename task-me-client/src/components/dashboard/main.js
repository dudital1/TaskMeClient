import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Switch from '@material-ui/core/Switch';
import MailIcon from '@material-ui/icons/Mail';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MainListItems from './listItems';
import axios from "axios";
import { useHistory } from "react-router-dom";
import Dashboard from './Dashboard';
import Box from "@material-ui/core/Box";
import Profile from './profile';
import Stats from './Stats';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import NotificationsConfirmation from "./NotificationsConfirmation";
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
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },

    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
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
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

const Main = () => {

    let history = useHistory();
    const user = JSON.parse(localStorage.getItem("storageUser"));
    const [content , setContent] = useState("dashboard")
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [shared,setShared] = useState(0)
    const [sharedUser,setSharedUser] = useState(0)

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    }
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        axios.get("http://localhost:5500/auth/sign-in").then((response) => {
            if (response.data.loggedIn === false) {
                localStorage.clear();
                history.push('/');
            }
            console.log(user)
        })
        getSharedTasks()
    }, []);

    function logout() {
        axios.get('http://localhost:5500/auth/logout').then(() => {
            localStorage.clear();
            history.push('/');
        })
    }
    function updateContent(tmpContent){
        setContent(tmpContent)
    }
    function switchContent(){
        if(content==="dashboard")
            return <Dashboard />
        if (content==="profile")
            return <Profile />
        if (content==="Stats")
            return <Stats />
    }

    function getSharedTasks(){
        axios.post(`http://localhost:5500/api/tasks/is-any-shared`, {
            userEmail:user.email
        }).then((response => {
            console.log(JSON.stringify(response.data.length));
            setShared(response.data.length);
            setSharedUser(response.data.email)
        }))
    }

    const [darkMode, setDarkMode] = useState(false)

    const theme = createMuiTheme({

        palette: {
            type: darkMode ? "dark" : "light",
        },
      });

    // const theme = createMuiTheme({
    //     palette: {
    //         type: darkMode ? "dark" : "light",
    //     },
    // });

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            {user ? user.name.toUpperCase() : ""}
                        </Typography>
                    Dark Mode
                    <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)}></Switch>
                        <Box mr={3}>
                            <NotificationsConfirmation shared={shared} sourceUser={sharedUser}  email={user.email} setShared={setShared} />
                        </Box>
                        <Avatar alt="Remy Sharp" src={user.picture} />
                        <IconButton color="inherit">
                            <Badge color="secondary" >
                                <ExitToAppIcon onClick={logout} />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <MainListItems setContent={updateContent}/>
                    <Divider />
                </Drawer>
                {switchContent()}
            </div>
            <Box pt={4}>
                <Copyright />
            </Box>
        </ThemeProvider>
    );
};
export default Main;

