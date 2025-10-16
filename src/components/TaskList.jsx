import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList({ query }) {
  const { tasks, toggleTask } = useContext(TaskContext);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
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
  );
}

export default TaskList;
