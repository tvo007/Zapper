import axios from 'axios';
import {setAlert} from './alert';
import {
  PROJECT_ERROR,
  ADD_TICKET,
  REMOVE_TICKET,
  TOGGLE_TICKET_COMPLETED,
  EDIT_TICKET,
  ADD_TICKET_SUBTASK,
  REMOVE_TICKET_SUBTASK,
  TOGGLE_TICKET_SUBTASK,
  EDIT_TICKET_SUBTASK,
} from './types';

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

//edit ticket info
export const editTicket = (projectId, ticketId, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put (
      `/api/projects/tickets/${projectId}/${ticketId}`,
      formData,
      config
    );

    dispatch ({
      type: EDIT_TICKET,
      payload: res.data,
    });

    dispatch (setAlert ('Ticket details changed!', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//ticket subtasks

//add ticket subtask
export const addTicketSubtask = (
  projectId,
  ticketId,
  formData
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post (
      `/api/projects/tickets/${projectId}/${ticketId}/subtasks`,
      formData,
      config
    );

    dispatch ({
      type: EDIT_TICKET_SUBTASK,
      payload: res.data,
    });

    dispatch (setAlert ('Subtask Added', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//edit story subtask
export const editTicketSubtask = (
  projectId,
  ticketId,
  subtaskId,
  formData
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put (
      `/api/projects/tickets/${projectId}/${ticketId}/${subtaskId}`,
      formData,
      config
    );

    dispatch ({
      type: EDIT_TICKET_SUBTASK,
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

//delete ticket subtask
export const deleteTicketSubtask = (
  projectId,
  ticketId,
  subtaskId
) => async dispatch => {
  try {
    // const res =

    const res = await axios.delete (
      `/api/projects/tickets/${projectId}/${ticketId}/${subtaskId}`
    );

    dispatch ({
      type: REMOVE_TICKET_SUBTASK,
      payload: {ticketId, subtasks: res.data},
    });

    dispatch (setAlert ('Subtask Removed', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//toggle ticket subtask
export const toggleTicketSubtask = (
  projectId,
  ticketId,
  subtaskId
) => async dispatch => {
  try {
    const res = await axios.put (
      `/api/projects/tickets/${projectId}/${ticketId}/${subtaskId}/isCompleted`
    );

    dispatch ({
      type: TOGGLE_TICKET_SUBTASK,
      payload: {ticketId, subtasks: res.data},
    });

    //res.data returns project.tasks array

    dispatch (setAlert ('Subtask status has changed!', 'success'));
  } catch (err) {
    console.log (err);
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};
