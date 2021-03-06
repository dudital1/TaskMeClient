import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment'

const useStyles = makeStyles(({

    dialogForm: {
        display: "flex",
        flexDirection: "column",
    }
}));

export default function FormDialog({task, numSelected, refresh}) {
    const [currentTask, setCurrentTask] = useState({});
    const [open, setOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState(false);

    const classes = useStyles();

    const handleClickOpen = () => {
        if (numSelected > 1) {
            setAlertMsg("Can't edit more than 1 task.")
            setAlertOpen(true)
        } else if (numSelected === 0) {
            setAlertMsg("Choose a task to edit.")
            setAlertOpen(true)
        } else {
            loadTask(task)
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setAlertOpen(false);
        refresh();
    };
    const handleUpdate = () => {
        axios.put(`https://enigmatic-spire-75482.herokuapp.com/api/tasks`, {
            _id: task,
            taskName: currentTask.taskName,
            durationMin: currentTask.durationMin,
            startTime: currentTask.startTime,
            description: currentTask.description,
            status: currentTask.status,
            category: currentTask.category
        }).then((response => {
            if (response.data.message === 'succesful') {
                console.log('update succesful');
            } else {
                console.log('update failed');
            }
            handleClose();
        }))

    };

    const loadTask = (task) => {
        axios.get(`https://enigmatic-spire-75482.herokuapp.com/api/tasks/view/${task}`).then((response => {
            if (response.data) {
                setCurrentTask(response.data)
                console.log("Task loaded!!");
            } else {
                console.log('failed to load task');
            }
        }))

    };

    return (
        <div>
            <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
                <EditIcon/>
            </IconButton>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={alertOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`${alertMsg}`}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={handleClose}
                    aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Update Task</DialogTitle>
                <DialogContent className={classes.dialogForm}>
                    <DialogContentText>
                        Please fill all fields
                    </DialogContentText>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
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
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        autoFocus
                        margin="dense"
                        id="duration"
                        label="Duration"
                        type="number"
                        value={currentTask.durationMin}
                        onChange={event => {
                            setCurrentTask({...currentTask, durationMin: event.target.value})
                        }}

                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        autoFocus
                        margin="dense"
                        id="startTime"
                        label="Start date and time"
                        type="datetime-local"
                        value={moment(new Date(currentTask.startTime)).format('YYYY-MM-DDTHH:mm')}
                        onChange={event => {
                            setCurrentTask({...currentTask, startTime: event.target.value})
                        }}

                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
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
                    <InputLabel shrink id="statusSelectLabel" value={currentTask.status}>
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
                    <Button onClick={handleClose} color="primary" variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary" variant="contained">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}