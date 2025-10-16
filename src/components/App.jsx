import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";

function App() {

  const { tasks, toggleTask } = useContext(TaskContext);
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter(
    (task) =>
      task.title &&
      task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm />
      <SearchBar search={search} setSearch={setSearch} />

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <span
              style={{ textDecoration: task.completed ? "line-through" : "none" }}
            >
              {task.title}
            </span>
            <button
              data-testid={task.id}
              className="complete-btn"
              onClick={() => toggleTask(task.id)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
