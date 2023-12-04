import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  List,
  TextField,
  Button,
  Box,
} from "@mui/material";
import Task from "./components/Task";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const addTask = () => {
    if (taskText.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: Date.now(),
      };
      setTasks([...tasks, newTask]);
      setTaskText("");
    }
  };

  const toggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const editTaskText = (taskId, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task,
      ),
    );
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Task Manager</Typography>
        </Toolbar>
      </AppBar>
      <List>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            removeTask={removeTask}
            editTaskText={editTaskText}
          />
        ))}
      </List>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TextField
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Add new task..."
            inputProps={{ style: { height: "15px" } }}
            sx={{ flex: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "green",
              height: "48px",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
          >
            Add Task
          </Button>
        </form>
      </Box>
    </Container>
  );
}
