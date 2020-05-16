import axios from 'axios';
import {setAlert} from './alert';
import {
  GET_PROJECTS,
  PROJECT_ERROR,
  EDIT_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT,
  ADD_PROJECT,
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



