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

const MeanHoursChart = ({tmpUser}) => {
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
                    text="Duration By Category"

                />
                <ArgumentAxis/>
                <ValueAxis/>

                <BarSeries
                    valueField="mean"
                    argumentField="name"
                    name="Done"
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


export default MeanHoursChart;