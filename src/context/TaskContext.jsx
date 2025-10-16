import React, { createContext, useState, useEffect } from "react";

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

    return (
        <TaskContext.Provider value={{ tasks }}>
            {children}
        </TaskContext.Provider>
    );
}


export { TaskContext, TaskProvider };

