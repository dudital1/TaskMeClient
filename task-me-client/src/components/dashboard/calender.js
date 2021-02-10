import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Appointments,
    Toolbar,
    ViewSwitcher,
    MonthView,
    DayView,
    TodayButton,
    DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useState, useEffect } from 'react';
import axios from "axios";

const Calender = ({ tmpUser }) => {
    const [data, setData] = useState([]);
    const [currentViewName, setCurrentViewName] = useState('work-week');
    const [tasks, setTasks] = useState([]);

    const getAllTasks = () => {
        return (
            axios.post(`http://localhost:5500/api/tasks/`, {
                email: tmpUser.email,
            }).then((response => {
                response.data.map((item) => {
                    data.push(item);
                })
                if (data) {
                    data.map(item => {
                        let tmpTask = {
                            title: item.taskName,
                            startDate: Date.parse(item.startTime),
                            endDate: Date.parse(item.endTime)
                        }
                        tasks.push(tmpTask);
                        setTasks([...tasks]);
                    })
                } else {
                    console.log(data);
                }
                tasks.map(item => {
                    console.log(item);
                })
            })))
    }

    useEffect(() => {
        if (data.length === 0) {
            getAllTasks();
            setData([...data]);
            setTasks([...tasks]);
        }
    }, []);

    const currentViewNameChange = (currentViewName) => {
        setCurrentViewName(currentViewName);
    }

    return (
        <Paper>
            <Scheduler
                data={tasks}
                height={"100%"}
            >
                <ViewState
                    defaultCurrentDate={Date.now()}
                    currentViewName={currentViewName}
                    onCurrentViewNameChange={currentViewNameChange}
                />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <WeekView
                    name="work-week"
                    displayName="Week"
                    startDayHour={6}
                    endDayHour={24}
                    cellDuration={60}
                />
                <MonthView />
                <DayView
                    cellDuration={60}
                />

                <ViewSwitcher />
                <Appointments />
            </Scheduler>
        </Paper>
    );

}


export default Calender;
