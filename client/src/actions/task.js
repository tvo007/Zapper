import api from '../utils/api';
import {setAlert} from './alert';
import {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK_COMPLETED,
  ADD_SUBTASK,
  REMOVE_SUBTASK,
  TOGGLE_SUBTASK,
  GET_TASKS,
  GET_TASK,
  EDIT_TASK,
  EDIT_SUBTASK,
  PROJECT_ERROR,
  
} from './types';

//task actions here

//getTasks

export const getTasks = (projectId) => async dispatch => {
  try {
    const res = await api.get (`/projects/${projectId}/tasks`);

    dispatch ({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//get task
export const getTask = (projectId, taskId) => async dispatch => {
  try {
    // const res =

    const res = await api.get (`/projects/${projectId}/tasks/${taskId}`);

    dispatch ({
      type: GET_TASK,
      payload: res.data,
    });

    dispatch (setAlert ('Task Retrieved', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};
//add task
export const addTask = (projectId, formData) => async dispatch => {
  try {
    const res = await api.post (`/projects/${projectId}/tasks`, formData);

    dispatch ({
      type: ADD_TASK,
      payload: res.data,
    });

    dispatch (setAlert ('Task Added', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//edit task
export const editTask = (projectId, taskId, formData) => async dispatch => {
  try {
    const res = await api.put (
      `/projects/${projectId}/tasks/${taskId}`,
      formData
    );

    dispatch ({
      type: EDIT_TASK,
      payload: res.data,
    });

    dispatch (setAlert ('Task details changed!', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//delete task
export const deleteTask = (projectId, taskId) => async dispatch => {
  try {
    // const res =

    await api.delete (`/projects/${projectId}/tasks/${taskId}`);

    dispatch ({
      type: REMOVE_TASK,
      payload: taskId,
    });

    dispatch (setAlert ('Task Removed', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//toggle task completed
export const toggleTaskCompleted = (projectId, taskId) => async dispatch => {
  try {
    const res = await api.put (
      `/projects/${projectId}/tasks/${taskId}/isCompleted`
    );

    dispatch ({
      type: TOGGLE_TASK_COMPLETED,
      payload: {taskId, isCompleted: res.data},
    });

    //res.data returns project.tasks array

    dispatch (setAlert ('Task status has changed!', 'success'));
  } catch (err) {
    console.log (err);
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//-------subtasks-------

//add subtask
export const addSubtask = (projectId, taskId, formData) => async dispatch => {
  try {
    const res = await api.post (
      `/projects/${projectId}/tasks/${taskId}/subtasks`,
      formData
    );

    dispatch ({
      type: ADD_SUBTASK,
      payload: {taskId, subtasks: res.data},
    });

    dispatch (setAlert ('Sub task Added', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//edit subtask
export const editSubtask = (
  projectId,
  taskId,
  subtaskId,
  formData
) => async dispatch => {
  try {
    const res = await api.put (
      `/projects/${projectId}/tasks/${taskId}/${subtaskId}`,
      formData
    );

    dispatch ({
      type: EDIT_SUBTASK,
      payload: res.data,
    });

    dispatch (setAlert ('Subtask details changed!', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//delete subtasks
export const deleteSubtask = (
  projectId,
  taskId,
  subtaskId
) => async dispatch => {
  try {
    // const res =

    const res = await api.delete (
      `/projects/${projectId}/tasks/${taskId}/${subtaskId}`
    );

    dispatch ({
      type: REMOVE_SUBTASK,
      payload: {taskId, subtasks: res.data},
    });

    dispatch (setAlert ('Task Removed', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//toggle subtask
export const toggleSubtask = (
  projectId,
  taskId,
  subtaskId
) => async dispatch => {
  try {
    const res = await api.put (
      `/projects/${projectId}/tasks/${taskId}/${subtaskId}/isCompleted`
    );

    dispatch ({
      type: TOGGLE_SUBTASK,
      payload: {taskId, subtasks: res.data},
    });

    //res.data returns project.tasks array

    dispatch (setAlert ('Task status has changed!', 'success'));
  } catch (err) {
    console.log (err);
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};
