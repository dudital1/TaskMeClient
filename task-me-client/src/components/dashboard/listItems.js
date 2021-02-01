import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";


const MainListItems = () => {
    let history = useHistory();
    return (
        <div>
            <ListItem button onClick={() => { history.push('/main/dashboard') }}>
                <ListItemIcon>
                    <DashboardIcon>
                    </DashboardIcon>
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon>
                        <Link exact to='/main/profile' />
                    </PeopleIcon>
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon >
                        <Link exact to='/reports' />
                    </BarChartIcon>
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItem>
        </div>
    )
};
export default MainListItems;

// export const secondaryListItems = (
//     <div>
//         <ListSubheader inset>Saved reports</ListSubheader>
//         <ListItem button>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Current month" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Last quarter" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Year-end sale" />
//         </ListItem>
//     </div>
// );