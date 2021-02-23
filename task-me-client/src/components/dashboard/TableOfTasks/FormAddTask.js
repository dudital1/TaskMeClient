import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(({

    dialogForm: {
        height: "700px",
        width: "500px",
        display: "flex",
        flexDirection: "column",
    }
}));

export default function FormAddTask({email, refresh}) {
    const [currentTask, setCurrentTask] = useState({});
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        refresh();
    };
    const handleAdd = () => {
        axios.post(`https://enigmatic-spire-75482.herokuapp.com/api/tasks/add-task`, {
            userEmail: email,
            taskName: currentTask.taskName,
            durationMin: currentTask.durationMin,
            startTime: currentTask.startTime,
            endTime: currentTask.endTime,
            description: currentTask.description,
            status: currentTask.status,
            category: currentTask.category
        }).then((response => {
            if (response.data.message === 'successful') {
                console.log('Added successful');
            } else {
                console.log('Add task failed');
            }
            setCurrentTask({})
            handleClose();
        }))

    };


    return (
        <div>
            <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
                <PlaylistAddOutlinedIcon/>
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
                <DialogContent className={classes.dialogForm}>
                    <DialogContentText>
                        Please fill all fields
                    </DialogContentText>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="taskName"
                        label="Task Name"
                        type="text"
                        value={currentTask.taskName}
                        onChange={event => {
                            setCurrentTask({...currentTask, taskName: event.target.value})
                        }}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="duration"
                        label="Duration in minutes"
                        type="number"
                        value={currentTask.durationMin}
                        onChange={event => {
                            setCurrentTask({...currentTask, durationMin: event.target.value})
                        }}

                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="startTime"
                        label="Start date and time"
                        type="datetime-local"
                        defaultValue="2021-02-23T17:00"
                        value={currentTask.startTime}
                        onChange={event => {
                            setCurrentTask({...currentTask, startTime: event.target.value})
                        }}

                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="startTime"
                        label="End date and time"
                        type="datetime-local"
                        defaultValue="2021-02-23T17:00"
                        value={currentTask.endTime}
                        onChange={event => {
                            setCurrentTask({...currentTask, endTime: event.target.value})
                        }}

                    />
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="dense"
                        label="Description"
                        type="text"
                        value={currentTask.description}
                        onChange={event => {
                            setCurrentTask({...currentTask, description: event.target.value})
                        }}
                    />
                    <InputLabel shrink id="statusSelectLabel">
                        Status
                    </InputLabel>
                    <Select
                        labelId="statusSelectLabel"
                        id="statusSelect"
                        value={currentTask.status}
                        onChange={event => {
                            setCurrentTask({...currentTask, status: event.target.value})
                        }}
                    >
                        <MenuItem value={'In progress'}>In progress</MenuItem>
                        <MenuItem value={'New'}>New</MenuItem>
                        <MenuItem value={'Done'}>Done</MenuItem>
                    </Select>
                    <InputLabel shrink id="categorySelectLabel">
                        Category
                    </InputLabel>
                    <Select
                        labelId="categorySelectLabel"
                        id="categorySelect"
                        value={currentTask.category}
                        onChange={event => {
                            setCurrentTask({...currentTask, category: event.target.value})
                        }}
                    >
                        <MenuItem value={'Education'}>Education</MenuItem>
                        <MenuItem value={'Training'}>Training</MenuItem>
                        <MenuItem value={'Meeting'}>Meeting</MenuItem>
                        <MenuItem value={'Home'}>Home</MenuItem>
                        <MenuItem value={'General'}>General</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAdd} color="primary" variant="contained">
                        Add Task
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}