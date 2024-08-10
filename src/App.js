import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setNewTask(tasks[index]);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === currentTaskIndex ? newTask : task
    );
    setTasks(updatedTasks);
    setNewTask('');
    setIsEditing(false);
    setCurrentTaskIndex(null);
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="app-container">
      <div className="todo-app">
        <h1>Todo App</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Add your new todo"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={isEditing ? updateTask : addTask}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              {task}
              <button className="edit-btn" onClick={() => editTask(index)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
        <div className="footer">
          <p>You have {tasks.length} pending tasks</p>
          <button className="clear-btn" onClick={clearAllTasks}>Clear All</button>
        </div>
      </div>
    </div>
  );
}

export default App;
