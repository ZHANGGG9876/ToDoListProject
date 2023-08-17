import {
  Firestore,
    doc,
    getDoc,
    updateDoc,
} from 'firebase/firestore';
import { firestore } from '../firebase';


export const readTasksFromUser = async (uid) => {
  try {
    const userRef = doc(firestore, 'users', uid);

    const userDoc = await getDoc(userRef); // Obtener el documento del usuario

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const tasks = userData.tasks;
      console.log('Tareas del usuario:', tasks);
      return tasks;
    } else {
      console.error('El usuario no existe');
      return [];
    }
  } catch (error) {
    console.error('Error al obtener tareas del usuario:', error);
    return [];
  }
};

export const addTaskToUser = async (uid, taskData) => {
  try {
    const userRef = doc(firestore, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
  
      const updatedTasks = [...userData.tasks, taskData];
      await updateDoc(userRef, {
        tasks: updatedTasks
      });
    }
  } catch (error) {
    {console.log('error add task', error)}
  }
 
}
  
export const markImportantTask = async (uid, idTask) => {
  try {
    const userRef = doc(firestore, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedTasks = userData.tasks.map((task) => {
        if (task.id === idTask) {
          return { ...task, important: !task.important };
        }
        return task;
      });
      await updateDoc(userRef,{
        tasks:updatedTasks
      });
    } 
    console.log('Tarea marcada como completada o no completada exitosamente');
  } catch (error) {
    console.error('Error al marcar la tarea como completada:', error);
  }
}

export const markCompleteTask = async (uid, idTask) => {
  try {
    const userRef = doc(firestore, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedTasks = userData.tasks.map((task) => {
        if (task.id === idTask) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      await updateDoc(userRef, {
        tasks: updatedTasks
      });
    }
    console.log('Tarea marcada como completada o no completada exitosamente');
  } catch (error) {
    console.error('Error al marcar la tarea como completada:', error);
  }
}

export const updateTask = async (uid, task) => {
 
  try {
    const userRef = doc(firestore, 'users', uid);
    console.log('task', task);
    const userDoc = await getDoc(userRef);
   
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedTasks = userData.tasks.map((t) => {
        if (t.id == task.id){
          console.log('task', task);
          return task;
        }
        return t;
      });
  
      await updateDoc(userRef, {
        tasks: updatedTasks
      });
      console.log('Tarea actualizada correctamente.')
    }
  } catch (error) {
    console.log('Error al actualizar la tarea:', error);
  }
}

export const deleteTask = async (uid, idTask) => {
  try{
    const userRef = doc(firestore, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists) {
      const userData = userDoc.data();
      const updatedTasks = userData.tasks.filter((task) => task.id !== idTask);
      await updateDoc(userRef, { tasks: updatedTasks });
      console.log('Tarea eliminada exitosamente');
    } else {
      console.log('El documento de usuario no existe');
    }
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
  }
};