import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Divider from '@material-ui/core/Divider';
// import Drawer from "@material-ui/core/Drawer";


const MainListItems =({setContent}) => {

    return(
        <div>
            <ListItem button onClick={()=>{
                setContent("dashboard")
            }}>
                <ListItemIcon>
                    <DashboardIcon>
                    </DashboardIcon>
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={()=>{
                setContent("profile")
            }}>
                <ListItemIcon>
                    <PeopleIcon>
                    </PeopleIcon>
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={()=>{
                setContent("Stats")
            }}>
                <ListItemIcon>
                    <BarChartIcon >
                    </BarChartIcon>
                </ListItemIcon>
                <ListItemText primary="Stats" />
            </ListItem>

            <Divider />
        </div>
    );
}
export default MainListItems;
