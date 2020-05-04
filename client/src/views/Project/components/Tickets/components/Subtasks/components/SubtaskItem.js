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
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles (() => ({
  root: {},
}));

const SubtaskItem = props => {
  const {
    id,
    subtaskSummary,
    subtaskDescription,
    date,
    handleSelectOne,
    selectedItems,
    projectId,

    ...rest
  } = props;

  const classes = useStyles ();

  return (
      <TableRow
        className={classes.tableRow}
        hover
        selected={selectedItems.indexOf (id) !== -1}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={selectedItems.indexOf (id) !== -1}
            color="primary"
            onChange={event => handleSelectOne (event, id)}
            value="true"
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

          <AssignmentIcon />

          <DeleteIcon />

        </TableCell>

      </TableRow>
  );
};

SubtaskItem.propTypes = {
  className: PropTypes.string,
};

export default SubtaskItem;
