import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import HistoryTasks from "../components/HistoryTasks.jsx";
import { ApiService } from "../services/api.js";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider.jsx";

export default function History() {
    const { authTokens } = useContext(AuthContext);
    const apiService = new ApiService(authTokens);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await apiService.getTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    });

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
                />
            </Box>
        </Container>
    )
}