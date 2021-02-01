import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        alignSelf: "flex-start"
    },
    avatar: {
        width: theme.spacing(50),
        height: theme.spacing(50),
        margin: "0px auto"
    },
    profilePage: {
        display:"flex",
        justifyContent:"space-between",
        alignItems: "center"
    }
}));

export default function OverallStats({ tmpUser }) {

    const classes = useStyles();
    const user = (tmpUser);

    return (
        <div className={classes.profilePage}>
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <FaceIcon  />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Name" secondary={user.name} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <AlternateEmailIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Email" secondary={user.email} />
            </ListItem>
        </List>
        <Avatar src={user.picture} className={classes.avatar} />
        </div>
    );
}