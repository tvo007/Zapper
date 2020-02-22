import axios from 'axios';
import {setAlert} from './alert';
import {
  GET_PROJECTS,
  PROJECT_ERROR,
  DELETE_PROJECT,
  GET_PROJECT,
  ADD_PROJECT,
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK_COMPLETED,
  ADD_TICKET,
  REMOVE_TICKET,
  TOGGLE_TICKET_COMPLETED,
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

//-----ticketing/bug tracking system here

/*riff off of adding tasks */

//add ticket
export const addTicket = (projectId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post (
      `/api/projects/tickets/${projectId}`,
      formData,
      config
    );

    dispatch ({
      type: ADD_TICKET,
      payload: res.data,
    });

    dispatch (setAlert ('Ticket Added', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//delete ticket
export const deleteTicket = (projectId, ticketId) => async dispatch => {
  try {
    // const res =

    await axios.delete (`/api/projects/tickets/${projectId}/${ticketId}`);

    dispatch ({
      type: REMOVE_TICKET,
      payload: ticketId,
    });

    dispatch (setAlert ('Ticket Removed', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//toggle task ticket completed
export const toggleTicketCompleted = (
  projectId,
  ticketId
) => async dispatch => {
  try {
    const res = await axios.put (
      `/api/projects/tickets/${projectId}/${ticketId}/isCompleted`
    );

    dispatch ({
      type: TOGGLE_TICKET_COMPLETED,
      payload: {ticketId, isCompleted: res.data},
    });

    //res.data returns project.tasks array

    dispatch (setAlert ('Ticket status has changed!', 'success'));
  } catch (err) {
    console.log (err);
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};
