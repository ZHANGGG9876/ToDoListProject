import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { logout } from '../utils/firebase-auth';
import { useNavigate } from 'react-router-dom';
import Sidebar from './menu/Sidebar';
import './TodoList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { auth, firestore } from '../firebase';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { updateTask, markImportantTask, markCompleteTask, deleteTask } from '../utils/firebase-db';

const TodoList = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtrarOption, setFilterOption] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const history = useNavigate();

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(newSearchTerm.toLowerCase())
      );
      setFilteredTasks(filtered);
  }

  const handleFilter = (filter) => {
    setFilterOption(filter);
    let filteredTasks = tasks;

    if (filter === 'today') {
      const today = new Date().toISOString().substr(0, 10); 
      filteredTasks = tasks.filter(task => task.date === today);
      
    } else if (filter === 'next7Days') {
      const today = new Date();
      const next7Days = new Date(today);
      next7Days.setDate(today.getDate() + 7);
      const next7DaysFormatted = next7Days.toISOString().substr(0, 10);
      filteredTasks = tasks.filter(task => task.date >= today.toISOString().substr(0, 10) && task.date <= next7DaysFormatted);
    }
    setFilteredTasks(filteredTasks);
  }

  const handleLogout = () => {
    logout()
    .then(() => {
      setUser(null);
      setTasks([]);
      history('/login');
    })
    .catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        const docRef = doc(firestore, "users", authUser.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.empty) {
          const userData = docSnap.data();
          setUser(userData);
          setUsername(userData.username || '');
          setTasks(userData.tasks || []);
          setFilteredTasks(userData.tasks || []);
          {console.log('filtrarOption',filtrarOption)}
          const unsubscribeTasks = onSnapshot(docRef, (docSnapshot) => {
            const updatedUserData = docSnapshot.data();
            setTasks(updatedUserData.tasks || []);
            setFilteredTasks(updatedUserData.tasks || []);
          });
  
          return () => {
            unsubscribeTasks();
          };
        }
      } else {
        setUser(null);
      }
    });
  
    return () => {
      unsubscribeAuth();
    };
  }, []);
  
  const handleMarkComplete = (uidTask) => {
    markCompleteTask(user.uid, uidTask);
  };

  const handleDelete = (id) => {
    deleteTask(user.uid, id);
  };

  const handleMarkImportant = (uidTask) => {
    markImportantTask(user.uid, uidTask);
  };

  const handleEdit = (idTask, editedTitle, editedDate, editedDescription, important, completed) => {
    try {
      const Task = {
        id: idTask,
        title: editedTitle,
        date: editedDate,
        description: editedDescription,
        important: important,
        completed: completed,
      }
      updateTask(user.uid, Task);
    } catch (error) {
      console.log('error',error);
    }
  };

  return ( user ? (
    <div className="page-container">
      <Sidebar user={user} handleLogout={handleLogout} handleFilter={handleFilter}/>
      <div className="main-content">
      <div className='page-header'>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search Task"
            value={searchTerm}
            onChange={handleSearchChange}
             />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div> 
      <div className="task-list-container">
        <div className="task-list">
            {filteredTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onMarkComplete={handleMarkComplete}
                onMarkImportant={handleMarkImportant}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div> ) : (
      <h1>not authorized</h1>
    )
  );
};

export default TodoList;
