import axios from 'axios';
import {setAlert} from './alert';
import {
  PROJECT_ERROR,
  ADD_TICKET,
  REMOVE_TICKET,
  TOGGLE_TICKET_COMPLETED,
  EDIT_TICKET
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
  
      const res = await axios.put (`/api/projects/tickets/${projectId}/${ticketId}`, formData, config);
  
      dispatch ({
        type: EDIT_TICKET,
        payload: res.data
      });
  
      dispatch (setAlert ('Ticket details changed!', 'success'));
    } catch (err) {
      dispatch ({
        type: PROJECT_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status},
      });
    }
  };