import React, { useState } from "react";
import { Card, Checkbox, Button, TextField, Typography } from "@mui/material";

function Task({ task, toggleComplete, removeTask, editTaskText }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const startEditing = () => {
    setIsEditing(true);
  };

  const finishEditing = () => {
    editTaskText(task.id, editedText);
    setIsEditing(false);
  };

  const formatCreationTime = () => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const creationTime = new Date(task.createdAt).toLocaleString(
      "en-US",
      options,
    );
    return creationTime;
  };

  const handleCheckboxChange = () => {
    toggleComplete(task.id);
  };

  return (
    <Card
      className={`task ${task.completed ? "completed" : ""}`}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
      }}
    >
      <div
        className="task-content"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Checkbox
          checked={task.completed}
          onChange={handleCheckboxChange}
          color="primary"
        />
        <div className="task-text-container" style={{ marginLeft: "8px" }}>
          {isEditing ? (
            <TextField
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              fullWidth
            />
          ) : (
            <div style={{ display: "flex", gap: "20px", marginRight: "8px" }}>
              <Typography variant="body1">{task.text}</Typography>
              <Typography variant="body2" color="textSecondary">
                Created at: {formatCreationTime()}
              </Typography>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: "8px", margin: "8px" }}>
        {isEditing ? (
          <Button variant="contained" onClick={finishEditing}>
            Save
          </Button>
        ) : (
          <Button variant="contained" onClick={startEditing}>
            Edit
          </Button>
        )}
        <Button
          variant="contained"
          color="error"
          onClick={() => removeTask(task.id)}
        >
          Remove
        </Button>
      </div>
    </Card>
  );
}

export default Task;
