import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    Title,
    Legend,
    Tooltip,
    ArgumentAxis,
    ValueAxis,
    BarSeries,

} from '@devexpress/dx-react-chart-material-ui';
import {Stack} from '@devexpress/dx-react-chart';
import {EventTracker, Animation} from '@devexpress/dx-react-chart';
import {useEffect, useState} from 'react';
import axios from 'axios';

const StackChart = ({tmpUser}) => {
    const [data, setData] = useState([]);

    function getStats() {
        axios.post('https://enigmatic-spire-75482.herokuapp.com/api/tasks/stats', {
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
                <Title
                    text="Tasks status"

                />
                <ArgumentAxis/>
                <ValueAxis/>

                <BarSeries
                    valueField="done"
                    argumentField="name"
                    name="Done"
                />
                <BarSeries
                    valueField="In progress"
                    argumentField="name"
                    name="In progress"
                />
                <BarSeries
                    valueField="New"
                    argumentField="name"
                    name="New"
                />
                <Stack/>
                <Legend/>
                <EventTracker/>
                <Tooltip/>
                <Animation duration={3000}/>
            </Chart>
        </Paper>
    );
}


export default StackChart;