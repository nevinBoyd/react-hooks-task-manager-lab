import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";

function App() {

  // pull array from TaskContext
  const { tasks } = useContext(TaskContext);

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm />
      <SearchBar />

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
