import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMore } from "./ExpandMore";
import { useState } from "react";
import ResultModal from "./ResultModal";

export default function Task({ task, handleCancelTask, handleDeleteTask, fetchResult }) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState([]);

  const handleClickOpen = async  () => {
    setOpen(true);
    try {
        const fetchedResult = await fetchResult(task.id);
        setResult(fetchedResult.result);
    } catch (error) {
        console.error('Error fetching result:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card
      sx={{
        width: "70%",
        margin: "10px",
        transition: "height 0.3s"
      }}
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
          <Typography>Task ID: {task.task_id}</Typography>
          <Typography>Task Status: {task.status_display}</Typography>
          {task.status_display === "Pending" ? (
            <Button
              variant="contained"
              onClick={() => handleCancelTask(task.task_id)}
            >
              Cancel Task
            </Button>
          ) : null}
        </Box>
      </CardContent>
      <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Button 
            variant="contained"
            color="error"
            sx={{
                marginRight: "15px"
            }}
            onClick={() => handleDeleteTask(task.id)}    
          >
            Delete Task
          </Button>
          {task.status_display === 'Approved' ? (
            <Button 
            onClick={handleClickOpen} 
            variant="contained"
            >
                See Results
            </Button>
            ): null}
        </CardContent>
      </Collapse>
      <ResultModal 
        open={open}
        handleClose={handleClose}
        result={result}
      />
    </Card>
  );
}
