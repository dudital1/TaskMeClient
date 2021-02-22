import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

export default function NotificationsConfirmation({shared ,email , sourceUser,setShared}) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSharedTasks(){
        axios.post(`http://localhost:5500/api/tasks/apply-shared`, {
            userEmail:email
        }).then((response => {
            setShared(0)
        }))
        setOpen(false);
    }

    return (
        <div>
            <IconButton color="inherit" onClick={handleClickOpen}>
                <Badge color="secondary" badgeContent={shared}>
                    <MailIcon />
                </Badge>
            </IconButton>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {shared > 0 ?
                    <div>
                    <DialogTitle id="alert-dialog-title">{`You have ${shared} new shared tasks from ${sourceUser} .`}</DialogTitle>
                    <DialogContent>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="contained">
                    Decline
                    </Button>
                    <Button onClick={handleSharedTasks} color="primary" autoFocus variant="contained">
                    Accept
                    </Button>
                    </DialogActions>
                    </div>
                :
                    <div>
                    <DialogTitle id="alert-dialog-title">{`There are no incoming shared tasks!`}</DialogTitle>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="contained">
                    Close
                    </Button>
                    </DialogActions>
                    </div>
                }
            </Dialog>
        </div>
    );
}
