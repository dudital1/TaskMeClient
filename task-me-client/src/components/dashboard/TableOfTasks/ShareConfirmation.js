import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ShareIcon from "@material-ui/icons/Share";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import TextField from "@material-ui/core/TextField";


export default function ShareConfirmation({task}) {

    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseShare = () => {
        task.forEach(task => {
            axios.post(`http://enigmatic-spire-75482.herokuapp.com/api/tasks/share-task`, {
                _id: task,
                targetUserEmail: email,
            })
        })
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={handleClickOpen}>
                    <ShareIcon color={"primary"}/>
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
                <DialogTitle id="alert-dialog-title">{"Share Task"} </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Share with:
                    </DialogContentText>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        autoFocus
                        placeholder="placeholder@gmail.com"
                        margin="dense"
                        id="taskName"
                        label="Email"
                        type="text"
                        onChange={event => {
                            setEmail(event.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={handleCloseShare} color="primary" autoFocus variant="contained">
                        Share
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
