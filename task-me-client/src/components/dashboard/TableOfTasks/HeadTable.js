import {fade, lighten, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import React from "react";
import FormDialog from "./FormDialog";
import FormAddTask from "./FormAddTask";
// import TableRow from "@material-ui/core/TableRow";
import axios from "axios";


const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const EnhancedTableToolbar = ({selected,numSelected ,search,email}) => {
    // const [value, setValue] = React.useState()
    const classes = useToolbarStyles();
    function triggerSearch (tmpValue) {
        // setValue(tmpValue)
        search(tmpValue)
    };
    function deleteSelected(){
        selected.map(task => {
            axios.delete(`http://localhost:5500/api/tasks/${task}`).then((response => {
                if (response.data.deletedCount!=0) {
                    console.log("Task deleted!!");
                } else {
                    console.log('Failed to delete task');
                }
            }))
        })
    };
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    All Tasks
                </Typography>
            )}
            <FormAddTask email={email}/>
            <FormDialog task={selected} numSelected={numSelected}/>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={event=>{triggerSearch(event.target.value)}}
                />
            </div>
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={deleteSelected}>

                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (<div></div>)}
        </Toolbar>
    );
};
export default EnhancedTableToolbar;

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};