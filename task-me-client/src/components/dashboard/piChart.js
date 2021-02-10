import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { useEffect, useState } from 'react';
import axios from 'axios';

// const categories = ["Education" , "Training" , "Meeting" , "Home" , "General"];

const PieChart = ({tmpUser}) => {
  const [data, setData] = useState([]);

  function getStats() {
  axios.post('http://localhost:5500/api/tasks/stats', {
    email: tmpUser.email,
  }).then((response => {
    setData(response.data);
    response.data.map(item => {
      console.log(item);
    })
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
      </Chart>
    </Paper>
  );
}


export default PieChart;