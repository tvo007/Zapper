import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
  Grid,
  Checkbox,
  TableCell,
  TableRow,
  Divider,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
// import {connect} from 'react-redux';
// import {
//   deleteTicket,
//   toggleTicketCompleted,
//   editTicket,
// } from '../../../../../../actions/ticket';
import moment from 'moment';
// import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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

  //const checkboxChecked = isCompleted ? true : false;
  return (
    <React.Fragment>
      <ListItem key={subtaskId}>
        <ListItemIcon>
          <Checkbox />
        </ListItemIcon>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="stretch"
        >
          <ListItemText>
            <Typography variant="h6">
              Summary: {subtaskSummary}
            </Typography>
          </ListItemText>

          <ListItemText>
            <Typography>
              Desc: {subtaskDescription}
            </Typography>
          </ListItemText>

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <EditIcon />
            <DeleteIcon />
          </Grid>
        </Grid>
      </ListItem>
      <Divider variant="middle" component="li" />
    </React.Fragment>
  );
};

SubtaskItem.propTypes = {
  className: PropTypes.string,
};

export default SubtaskItem;
