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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({

    dialogForm: {
        display: "flex" , 
        flexDirection: "column" ,
    }
}));

export default function FormDialog({ task, numSelected,refresh }) {
    const [currentTask, setCurrentTask] = useState({});
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        if (numSelected>1){
            alert("Can't edit more than 1 task.")

        }
        else if(numSelected==0){
            alert("Choose a task to edit.")
        }
        else {
            loadTask(task)
            setOpen(true);
        }
    };

    const handleClose = () => {
        console.log(currentTask);
        console.log(task);
        setOpen(false);
        refresh();
    };
    const handleUpdate = () => {
        console.log(currentTask);
        console.log("taks",task);
        console.log("taskName",currentTask.taskName);
        console.log("duration",currentTask.durationMin);
        console.log("startTime",currentTask.startTime);
        console.log("description",currentTask.description);
        console.log("status",currentTask.status);
        console.log("category",currentTask.category);
        axios.put(`http://localhost:5500/api/tasks`, {
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
        axios.get(`http://localhost:5500/api/tasks/view/${task}`).then((response => {
            if (response.data) {
                setCurrentTask(response.data)
                console.log("Task loaded!!",response.data);
            } else {
                console.log('failed to load task');
            }
        }))

    };

    return (
        <div>
            <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog fullWidth={"fullWidth"} maxWidth={"sm"} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Task</DialogTitle>
                <DialogContent className={classes.dialogForm} >
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
                        onChange={event => { setCurrentTask({...currentTask, taskName:event.target.value })}}
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
                        onChange={event => { setCurrentTask({...currentTask, durationMin:event.target.value })}}

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
                        defaultValue="2021-02-23T17:00"
                        value={currentTask.startTime}
                        onChange={event => { setCurrentTask({...currentTask, startTime:event.target.value })}}

                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        value={currentTask.description}
                        onChange={event => { setCurrentTask({...currentTask, description:event.target.value })}}

                    />
                    <InputLabel shrink id="statusSelectLabel">
                        Status
                    </InputLabel>
                    <Select
                        labelId="statusSelectLabel"
                        id="statusSelect"
                        value={currentTask.status}
                        onChange={event => { setCurrentTask({...currentTask, status:event.target.value })}}
                    >
                        <MenuItem value={'In progress'}>In progress</MenuItem>
                        <MenuItem value={'New'}>New</MenuItem>
                        <MenuItem value={'Done'}>Done</MenuItem>
                    </Select>
                    <InputLabel shrink id="categorySelectLabel">
                        Category
                    </InputLabel >
                    <Select
                        labelId="categorySelectLabel"
                        id="categorySelect"
                        value={currentTask.category}
                        onChange={event => { setCurrentTask({...currentTask, category:event.target.value })}}
                    >
                        <MenuItem value={'Education'}>Education</MenuItem>
                        <MenuItem value={'Training'}>Training</MenuItem>
                        <MenuItem value={'Meeting'}>Meeting</MenuItem>
                        <MenuItem value={'Home'}>Home</MenuItem>
                        <MenuItem value={'General'}>General</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}