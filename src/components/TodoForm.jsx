import React, { useState } from 'react';
import './TodoForm.css';
import {auth, firebase} from '../firebase';
import { readTodos, addTaskToUser } from '../utils/firebase-db';

const TodoForm = ({ user, onClose}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [description, setDescription] = useState('');
  const [important, setImportant] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleAddTask = async () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    if (title !== ''){
      const newTask = {
        id: `${timestamp}-${random}`,
        title,
        date,
        description,
        important,
        completed,
      }
      addTaskToUser(user.uid ,newTask)
      onClose();
    } 
  }

  return (
    <div className="popup-overlay">
      <form className="popup-form">
        <h2 className='add-task-form-title' >Add Task</h2>
        <input
          required
          className='form-title-input'
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input className='form-date-input' type="date"  value={date} onChange={(e) => setDate(e.target.value)}/>
        <i className="calender-icon"></i>
        <textarea
          className='form-description-input'
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className='form-checkbox-important'>
          <input
            type="checkbox"
            name="importance"
            checked={important}
            onChange={() => setImportant(!important)}
          />
          Important
        </label>
        <div className="button-container">
          <button className="form-add-button" onClick={handleAddTask}>Add</button>
          <button className="form-cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
