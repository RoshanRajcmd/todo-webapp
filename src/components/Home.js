import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { getAllTasks, addTodo, deleteTask, editTaskDec, setTaskComplete } from "../api/TaskService";

export const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const resp = await getAllTasks();
      console.log(resp);
      if (resp?.status === 200 && resp?.data !== null) {
        console.log(resp);
        setTodos(resp.data.data);
      }
    };

    fetchTasks();
  }, []);


  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
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