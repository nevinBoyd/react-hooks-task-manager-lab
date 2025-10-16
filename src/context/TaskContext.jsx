import React, { createContext, useState, useEffect } from "react";


const TaskContext = createContext();

function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:6001/tasks")
            .then((r) => r.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error("Error fetching tasks:", err));
    }, []);

    function addTask(title) {
        const newTask = { title, completed: false };
        setTasks((prev) => [...prev, { ...newTask, id: prev.length + 1 }]);

        fetch("http://localhost:6001/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        })
            .then((r) => r.json())
            .then((data) =>
                setTasks((prev) =>
                    prev.map((t) => (t.title === newTask.title ? { ...t, id: data.id } : t))
                )
            )
            .catch((err) => console.error("Error adding task:", err));
    }

    function toggleTask(id) {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);

        const toggledTask = updatedTasks.find((task) => task.id === id);
        fetch(`http://localhost:6001/tasks/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: toggledTask.completed }),
        }).catch((err) => console.error("Error updating task:", err));
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleTask }}>
            {children}
        </TaskContext.Provider>
    );
}

export { TaskContext, TaskProvider };
