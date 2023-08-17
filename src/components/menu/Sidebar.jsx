import React, { useState } from 'react';
import todoIocn from '../img/toDoListIcon.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css'
import TodoForm from '../TodoForm';

const Sidebar = ({ user, handleLogout, handleFilter}) => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const  handleFilterChange = (filter) => {
      setSelectedFilter(filter)
      handleFilter(filter)
    }
    return (
      <div className="sidebar">
        <div className="user-profile">
          <img src={todoIocn} alt="Profile" />
          <span>Hi, {user ? user.username : ''}</span>
        </div>
        <button className="add-task-button" onClick={() => setIsPopupOpen(true)}>Add Task</button>
        {isPopupOpen && (
          <TodoForm
            user={user}
            onClose={() => setIsPopupOpen(false)}
          />
        )}
        <hr className="separator" />
        <button
          className={selectedFilter === 'today' ? 'selected' : ''}
          onClick={() => handleFilterChange('today')}
        >
          Today's Tasks
        </button>
        <button
          className={selectedFilter === 'next7Days' ? 'selected' : ''}
          onClick={() => handleFilterChange('next7Days')}
        >
          Next 7 Days
        </button>
        <button
          className={selectedFilter === 'all' ? 'selected' : ''}
          onClick={() => handleFilterChange('all')}
        >
          All Tasks
        </button>
        <div className='logout-button-container'>
          <button className='settings-button'>Setting<FontAwesomeIcon icon={faCog} className='settings-icon' /></button>
          <button className='logout-button' onClick={handleLogout}>Logout<FontAwesomeIcon icon={faSignOutAlt} className='settings-icon' /></button>
        </div>
      </div>
    );
  };

export default Sidebar;