import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";


export default function DeleteConfirmation({task, refresh}) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    function handleCloseDelete() {
        task.forEach(task => {
            axios.delete(`http://localhost:5500/api/tasks/${task}`).then((response => {
                if (response.data.deletedCount !== 0) {
                    console.log("Task deleted!!");
                    refresh();
                } else {
                    console.log('Failed to delete task');
                }
            }))
        })
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={handleClickOpen}>

                    <DeleteIcon color={"primary"}/>
                </IconButton>
            </Tooltip>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{" Are you sure you want to delete these tasks ?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="contained">
                        No
                    </Button>
                    <Button onClick={handleCloseDelete} color="primary" autoFocus variant="contained">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
