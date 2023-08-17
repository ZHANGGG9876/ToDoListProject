import React, { useState } from 'react';
import './EditTaskModal.css'

const EditTaskModal = ({ task, onClose, onSave }) => {
    const [editedDate, setEditedDate] = useState(task.date);
    const [important, setImportant] = useState(task.important);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);

    const handleSave = () => {
        onSave(task.id, editedTitle, editedDate, editedDescription, important, task.completed);
        onClose();
    };

  return (
    <div className="edit-modal-overlay">
        <div className="edit-modal">
        <h2 className='edit-task-title'>Edit Task</h2>
        <input
            className='edit-title-input'
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
        />
        <input className='edit-date-input'  type="date" value={editedDate} onChange={(e) => setEditedDate(e.target.value)}/>
        <i className="calender-icon"></i>
        <textarea
            className='edit-description-input'
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
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
            <button className='edit-save-button' onClick={handleSave}>Save</button>
            <button className='edit-cancel-button' onClick={onClose}>Cancel</button>
        </div>
        </div>
    </div>
  );
};

export default EditTaskModal;
