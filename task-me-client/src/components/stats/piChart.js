import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    PieSeries,
    Title,
    Legend,
    Tooltip,


} from '@devexpress/dx-react-chart-material-ui';
import {EventTracker, Animation} from '@devexpress/dx-react-chart';
import {useEffect, useState} from 'react';
import axios from 'axios';

const PieChart = ({tmpUser}) => {
    const [data, setData] = useState([]);

    function getStats() {
        axios.post('http://localhost:5500/api/tasks/stats', {
            email: tmpUser.email,
        }).then((response => {
            setData(response.data);
        }))
    }

    useEffect(() => {
        getStats();
    }, []);

    return (
        <Paper>
            <Chart
                data={data ? data : []}
            >
                <PieSeries
                    valueField="all"
                    argumentField="name"
                />

                <Title
                    text="Tasks by category"

                />
                <Legend position="bottom"/>
                <EventTracker/>
                <Tooltip/>
                <Animation duration={3000}/>
            </Chart>
        </Paper>
    );
}


export default PieChart;