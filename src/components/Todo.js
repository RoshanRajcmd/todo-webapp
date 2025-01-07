import { React, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteTask, updateTask } from '../api/TaskService'

export const Todo = ({ task, onTaskAdded }) => {
  const [newTaskDesc, setNewTaskDesc] = useState(task.Content);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  }

  const handleChangeSubmit = async () => {
    task.Content = newTaskDesc.trim();
    var resp = await updateTask(task, task.ID);
    if (resp?.status === 200) {
      console.log('Task updated successfully');
      onTaskAdded();
    }
    else console.log('Failed to update task');
  }

  const toggleComplete = async (task) => {
    task.IsCompleted = !task.IsCompleted;
    var resp = await updateTask(task, task.ID);
    if (resp?.status === 200) {
      console.log('Task updated successfully');
      onTaskAdded();
    }
    else console.log('Failed to update task');
  }

  const deletTask = async (taskId) => {
    var resp = await deleteTask(taskId);
    if (resp?.status === 200) {
      console.log('Task Deleted successfully');
      onTaskAdded();
    }
    else console.log('Failed to Delete task');
  }

  return (
    <div>
      {isEditing ? (
        <form onSubmit={() => handleChangeSubmit(task)} className="TodoForm">
          <input type="text" value={newTaskDesc} onChange={(e) => setNewTaskDesc(e.target.value)} className="todo-input" placeholder='Update task' />
          <button type="submit" className='todo-btn'>Add Task</button>
        </form>
      ) :
        (

          <div className="Todo">
            <p className={`${task.IsCompleted ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task)}>{task.Content}</p>
            <div>
              <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => toggleEditMode()} />
              <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deletTask(task.ID)} />
            </div>
          </div>

        )
      }
    </div>
  )
}