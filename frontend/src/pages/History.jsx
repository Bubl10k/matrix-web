import { Box, Container, Typography } from "@mui/material";
import HistoryTasks from "../components/HistoryTasks.jsx";
import { ApiService } from "../services/api.js";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider.jsx";

export default function History() {
    const { authTokens } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState({});
    const apiService = new ApiService(authTokens);

    useEffect(() => {
        fetchTasks();
    }, [authTokens]);

    useEffect(() => {
        const interval = setInterval(() => {
            tasks.forEach((task) => {
                if (task.status_display === 'Pending') {
                    if (!pendingTasks[task.id]) {
                        setPendingTasks(prevState => (
                            { ...prevState, [task.id]: true }
                        ));
                    } else {
                        const elapsedTime = Date.now() - pendingTasks[task.id].startTime;
                        if (elapsedTime > 10000) {
                            handleCancelTask(task.id);
                            setPendingTasks(prevState => {
                                const newState = { ...prevState };
                                delete newState[task.id];
                                return newState;
                            });
                        }
                    }
                } else {
                    if (pendingTasks[task.id]) {
                        setPendingTasks(prevState => {
                            const newState = { ...prevState };
                            delete newState[task.id];
                            return newState;
                        });
                    }
                }
            })
            if (Object.keys(pendingTasks).length === 0) return;
            fetchTasks();
        }, 1000);
        return () => clearInterval(interval);
    }, [tasks, pendingTasks]);

    const fetchTasks = async () => {
        try {
            const fetchedTasks = await apiService.getTasks();
            setTasks(fetchedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const fetchResult = async (task_id) => {
        try {
            const result = await apiService.getResult(task_id);
            return result;
        } catch (error) {
            console.error('Error fetching result:', error);
        }
    };

    const handleCancelTask = async (task_id) => {
        try {
            await apiService.cancelTask(task_id);
            const updatedTasks = await apiService.getTasks();
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error cancelling task:', error);
        }
    };

    const handleDeleteTask = async (task_id) => {
        try {
            await apiService.deleteTask(task_id);
            const updatedTasks = await apiService.getTasks();
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    return (
        <Container maxWidth="xl">
            <Typography
                variant="h4"
                sx={{
                    color: 'white',
                    textAlign: 'center',
                    marginTop: '40px'
                }}
            >
                History of your calculations
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginTop: '40px'
                }}
            >
                <HistoryTasks
                    tasks={tasks}
                    handleCancelTask={handleCancelTask}
                    handleDeleteTask={handleDeleteTask}
                    fetchResult={fetchResult}
                />
            </Box>
        </Container>
    )
}