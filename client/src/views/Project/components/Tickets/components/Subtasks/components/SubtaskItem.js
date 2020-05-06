import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Checkbox, TableCell, TableRow, Typography} from '@material-ui/core';
// import {connect} from 'react-redux';
// import {
//   deleteTicket,
//   toggleTicketCompleted,
//   editTicket,
// } from '../../../../../../actions/ticket';
import moment from 'moment';
// import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles (() => ({
  root: {},
}));

const SubtaskItem = props => {
  const {
    subtaskId,
    ticketId,
    subtaskSummary,
    subtaskDescription,
    isCompleted,
    date,
    handleSelectOne,
    selectedItems,
    projectId,
    subtaskActions: {
      deleteTicketSubtask,
      toggleTicketSubtask,
      editTicketSubtask,
    },
    ...rest
  } = props;

  const classes = useStyles ();

  const toggleHandler = e =>
    toggleTicketSubtask (projectId, ticketId, subtaskId); //create custom hook??
  const deleteHandler = e =>
    deleteTicketSubtask (projectId, ticketId, subtaskId);

  const checkboxChecked = isCompleted ? true : false;
  return (
    <TableRow
      className={classes.tableRow}
      hover
      selected={selectedItems.indexOf (subtaskId) !== -1}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedItems.indexOf (subtaskId) !== -1}
          color="primary"
          onChange={event => handleSelectOne (event, subtaskId)}
          value="true"
          checked={checkboxChecked}
          onClick={toggleHandler}
        />
      </TableCell>
      <TableCell>
        <div className={classes.nameContainer}>
          <Typography variant="body1">
            Something goes here!!!
          </Typography>
        </div>
      </TableCell>
      <TableCell>{subtaskSummary}</TableCell>
      <TableCell>
        {subtaskDescription}
      </TableCell>
      <TableCell>
        # of subtasks here
      </TableCell>
      <TableCell>
        {moment (date).format ('DD/MM/YYYY')}
      </TableCell>
      <TableCell>
        <DeleteIcon onClick={deleteHandler} />
      </TableCell>

    </TableRow>
  );
};

SubtaskItem.propTypes = {
  className: PropTypes.string,
};

export default SubtaskItem;
