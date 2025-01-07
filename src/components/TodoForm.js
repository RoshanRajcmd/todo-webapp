import React, { useState } from 'react'
import { addTask } from '../api/TaskService'

export const TodoForm = ({ onTaskAdded }) => {
  const [taskDesc, setTaskDesc] = useState('');

  const handleSubmit = async (e) => {
    // prevent default action
    e.preventDefault();
    if (taskDesc.trim !== '') {
      // add todo
      var resp = await addTask(taskDesc);
      if (resp?.status === 200) {
        console.log('Task added successfully');
        onTaskAdded();
      }
      else {
        console.log('Failed to add task');
      }
      // clear form after submission
      setTaskDesc('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input type="text" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} className="todo-input" placeholder='What is the task today?' />
      <button type="submit" className='todo-btn'>Add Task</button>
    </form>
  )
}