import React, { useState, useId, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

// add new tasks globally
function TaskForm() {
  const [taskName, setTaskName] = useState("");

  // provides unique id for accessibility
  const inputId = useId();
  const { addTask } = useContext(TaskContext);

  // handles submissions   
  function handleSubmit(e) {
    e.preventDefault();
    if (taskName.trim() === "") return;

    addTask(taskName);
    setTaskName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId}>New Task:</label>
      <input
        id={inputId}
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
