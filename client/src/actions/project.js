import axios from 'axios';
import {setAlert} from './alert';
import {
  GET_PROJECTS,
  PROJECT_ERROR,
  EDIT_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT,
  ADD_PROJECT,
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK_COMPLETED,
  ADD_SUBTASK,
  REMOVE_SUBTASK,
  TOGGLE_SUBTASK,
  EDIT_TASK,
  EDIT_SUBTASK,
} from './types';

//get projects
export const getProjects = () => async dispatch => {
  try {
    const res = await axios.get ('/api/projects');

    dispatch ({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//add project
export const addProject = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // const res =

    const res = await axios.post (`/api/projects`, formData, config);

    dispatch ({
      type: ADD_PROJECT,
      payload: res.data,
    });

    dispatch (setAlert ('Project Created', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//EDIT PROJECT
export const editProject = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // const res =

    const res = await axios.put (`/api/projects/${id}`, formData, config);

    dispatch ({
      type: EDIT_PROJECT,
      payload: res.data,
    });

    dispatch (setAlert ('Project Editted.', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//del project
export const deleteProject = id => async dispatch => {
  try {
    // const res =

    await axios.delete (`/api/projects/${id}`);

    dispatch ({
      type: DELETE_PROJECT,
      payload: id,
    });

    dispatch (setAlert ('Project Removed', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//gets single project
export const getProject = id => async dispatch => {
  try {
    const res = await axios.get (`/api/projects/${id}`);

    dispatch ({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//task actions here

//add task
export const addTask = (projectId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post (
      `/api/projects/tasks/${projectId}`,
      formData,
      config
    );

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
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put (`/api/projects/tasks/${projectId}/${taskId}`, formData, config);

    dispatch ({
      type: EDIT_TASK,
      payload: res.data
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

    await axios.delete (`/api/projects/tasks/${projectId}/${taskId}`);

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
    const res = await axios.put (
      `/api/projects/tasks/${projectId}/${taskId}/isCompleted`
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
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post (
      `/api/projects/tasks/${projectId}/${taskId}/subtasks`,
      formData,
      config
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
export const editSubtask = (projectId, taskId, subtaskId, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put (`/api/projects/tasks/${projectId}/${taskId}/${subtaskId}`, formData, config);

    dispatch ({
      type: EDIT_SUBTASK,
      payload: res.data
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

    const res = await axios.delete (
      `/api/projects/tasks/${projectId}/${taskId}/${subtaskId}`
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
    const res = await axios.put (
      `/api/projects/tasks/${projectId}/${taskId}/${subtaskId}/isCompleted`
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


