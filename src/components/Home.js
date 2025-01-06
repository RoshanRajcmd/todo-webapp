import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { getAllTasks, deleteTask, editTaskDec, setTaskComplete } from "../api/TaskService";

export const Home = () => {
  const [todos, setTodos] = useState([]);
  const [tasksUpdated, setTaskUpdated] = useState(false);

  const handleTasksUpdated = () => {
    setTaskUpdated(!tasksUpdated); // Toggle the state to trigger re-render
  };

  const fetchTasks = async () => {
    const resp = await getAllTasks();
    console.log(resp);
    if (resp?.status === 200 && resp?.data !== null) {
      console.log(resp);
      setTodos(resp.data.data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [tasksUpdated]);


  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm onTodoAdded={handleTasksUpdated} />
      {/* display Tasks */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTaskDec} task={todo} />
        ) :
          (
            <Todo
              key={todo.ID}
              task={todo}
              deleteTask={deleteTask}
              editTodo={editTaskDec}
              setTaskComplete={setTaskComplete}
            />
          )
      )}
    </div>
  );
};