import React from 'react';
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



export default function FormDialog({ task }) {
    const currentTask = task;
    const [open, setOpen] = React.useState(false);
    
    const [name, setName] = React.useState(currentTask.taskName);
    const [duration, setDuration] = React.useState(currentTask.durationMin);
    const [time, setTime] = React.useState(currentTask.startTime);
    const [description, setDescription] = React.useState(currentTask.description);
    const [status, setStatus] = React.useState(currentTask.status);
    const [category, setCategory] = React.useState(currentTask.category);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleUpdate = () => {
        let updatedTask = { taskName:name , durationMin:duration , startTime:time , description:description , status:status , category:category};
        axios.put(`http://localhost:5500/api/tasks`, {
            _id: currentTask._id
        }).then((response => {
            if(response.data.message === 'succesful'){
                console.log('update succesful');
            }else{
                console.log('update failed');
            }
            handleClose();
        }))

    };

    return (
        <div>
            <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Task</DialogTitle>
                <DialogContent>
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
                        value={name}
                        onChange={event => {setName(event.target.value)}}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="duration"
                        label="Duration"
                        type="number"
                        value={duration}
                        onChange={event => {setDuration(event.target.value)}}

                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="startTime"
                        label="Start date and time"
                        type="datetime-local"
                        defaultValue="2021-02-07T11:00"
                        value={time}
                        onChange={event => {setTime(event.target.value)}}

                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        value={description}
                        onChange={event => {setDescription(event.target.value)}}

                    />
                    <InputLabel id="statusSelectLabel">
                        Status
                    </InputLabel>
                    <Select
                        labelId="statusSelectLabel"
                        id="statusSelect"
                        value={status}
                        onChange={event => {setStatus(event.target.value)}}
                    >
                        <MenuItem value={'In progress'}>In progress</MenuItem>
                        <MenuItem value={'New'}>New</MenuItem>
                        <MenuItem value={'Done'}>Done</MenuItem>
                    </Select>
                    <InputLabel id="categorySelectLabel">
                        Category
                    </InputLabel>
                    <Select
                        labelId="categorySelectLabel"
                        id="categorySelect"
                        value={category}
                        onChange={event => {setCategory(event.target.value)}}
                    >
                        <MenuItem value={'Education'}>Education</MenuItem>
                        <MenuItem value={'Training'}>Training</MenuItem>
                        <MenuItem value={'Meeting'}>Meeting</MenuItem>
                        <MenuItem value={'Home'}>Home</MenuItem>
                        <MenuItem value={'General'}>General</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdate} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}