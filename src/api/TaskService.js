import axios from "axios";

const API_URL = 'http://localhost:3000/todos';
const GET_ALL_TASKS = 'getAllTasks';
const CREATE_TASK = 'createTask';

export async function getAllTasks() {
    try {
        return await axios.get(`${API_URL}/${GET_ALL_TASKS}`);
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
        else
            console.log("Validation API Failed" + err.code + err.message);
    }
}

export async function addTodo(taskDec) {
    // setTodos([
    //     ...todos,
    //     { id: uuidv4(), task: todo, completed: false, isEditing: false },
    // ]);
    try {
        var task = { Content: taskDec, IsCompleted: false };
        return await axios.post(`${API_URL}/${CREATE_TASK}`, JSON.stringify(task), { headers: { 'Content-Type': 'application/json' } });
    }
    catch (err) {
        if (!err?.response)
            console.log("No Server Response");
        else
            console.log("Validation API Failed" + err.code + err.message);
    }
}

export async function deleteTask(id) {
    //setTodos(todos.filter((todo) => todo.id !== id));
}

export async function setTaskComplete(id) {
    // setTodos(
    //     todos.map((todo) =>
    //         todo.id === id ? { ...todo, completed: !todo.completed } : todo
    //     )
    // );
}

export async function editTaskDec(task, id) {
    // setTodos(
    //     todos.map((todo) =>
    //         todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    //     )
    // );
};