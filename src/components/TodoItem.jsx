import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faStar, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './TodoItem.css';
import EditTaskModal from './EditTaskModal';

const TodoItem = ({ task, onMarkComplete, onMarkImportant, onEdit, onDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // const handleEditTask = (taskId, editedTitle, editedDate, editedDescription, important) => {
  //   // Lógica para guardar los cambios editados
  // };

  return (
    <div className="task-item">
      <h3 className='task-title'
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      >{task.title}</h3>
      <p className='task-date' style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.date}</p>
      <p className='task-description' style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.description}</p>
      <div className="task-actions">
        <div className='important-completed-buttons'>
          <button className="completed-action-button" onClick={() => onMarkComplete(task.id)}>
            <FontAwesomeIcon icon={faCheckCircle} 
            style={{ color: task.completed ? '#20948b':''}}/>
          </button>
          <button className="important-action-button" onClick={() => onMarkImportant(task.id)}>
            <FontAwesomeIcon icon={faStar} 
            style={{ color: task.important ? '#DE7A22':''}}/>
          </button>
        </div>
        <div className='edit-delete-buttons'>
          <button className="edit-action-button" onClick={openEditModal}>
            Edit
          </button>
          {isEditModalOpen && (
            <EditTaskModal
              task={task}
              onClose={closeEditModal}
              onSave={onEdit}
            />
          )}
          <button className="delete-action-button" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
