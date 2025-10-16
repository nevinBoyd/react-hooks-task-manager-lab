import React, { createContext, useState, useEffect, use } from "react";

// create context
const TaskContext = createContext();

function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    // fetch backend tasks
    useEffect(() => {
        fetch("http://localhost:6001/tasks")
            .then((r) => r.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error("Error fetching tasks:"));
    }, []);

    // add new task to list and backend
    function addTask(title) {
        const newTask = {
            title,
            completed: false
        };

        fetch("http://localhost:6001/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        })
            .then((r) => r.json())
            .then((data) => setTasks([...tasks, data]))
            .catch((err) => console.error("Error adding task:", err));
    }

    // toggle completion for existing task  
    function toggleTask(id) {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }

    // shared access to tasks and functions  
    return (
        <TaskContext.Provider value={{ tasks }}>
            {children}
        </TaskContext.Provider>
    );
}

export { TaskContext, TaskProvider };

