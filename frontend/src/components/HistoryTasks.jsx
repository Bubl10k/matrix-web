import { Box, Button, Card, CardContent, Typography } from "@mui/material";

export default function HistoryTasks({ tasks }) {
  console.log(tasks);
  return (
    <>
      {tasks.map((task) => {
        return (
          <Card
            sx={{
              width: "70%",
              height: "100px",
              margin: "10px",
            }}
            key={task.id}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {task.id}
                </Typography>
                <Typography>
                    Task ID: {task.task_id}
                </Typography>
                <Typography>Task Status: {task.status_display}</Typography>
                {task.status_display === "Pending" ? (
                  <Button variant="contained">Cancel Task</Button>
                ) : null}
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
