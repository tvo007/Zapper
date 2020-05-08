import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {connect} from 'react-redux';
import {
  addTicketSubtask,
  editTicketSubtask,
  deleteTicketSubtask,
  toggleTicketSubtask,
} from '../../../../../../actions/ticket';
import {
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from '@material-ui/core';

import SubtaskItem from '../Subtasks/components/SubtaskItem';
import SubtaskForm from '../Subtasks/components/SubtaskForm';

const useStyles = makeStyles (theme => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing (2),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const Subtasks = props => {
  const {
    className,
    subtasks,
    projectId,
    addTicketSubtask,
    deleteTicketSubtask,
    editTicketSubtask,
    toggleTicketSubtask,
    ticketId,
    ...rest
  } = props;

  const subtaskActions = {
    addTicketSubtask,
    deleteTicketSubtask,
    editTicketSubtask,
    toggleTicketSubtask,
  };

  const classes = useStyles ();

  return (
    <React.Fragment>
      <SubtaskForm
        addTicketSubtask={subtaskActions.addTicketSubtask}
        projectId={projectId}
        ticketId={ticketId}
      />
      <Card {...rest} className={clsx (classes.root, className)}>
        <CardContent className={classes.content}>
          <List>
            {subtasks.map (subtask => (
              <SubtaskItem
                key={subtask._id}
                subtaskId={subtask._id}
                subtaskSummary={subtask.subtaskSummary}
                subtaskDescription={subtask.subtaskDescription}
                date={subtask.date}
                projectId={projectId}
                subtaskActions={subtaskActions}
                isCompleted={subtask.isCompleted}
                ticketId={ticketId}
              />
            ))}
          </List>
        </CardContent>
        <CardActions className={classes.actions} />
      </Card>
    </React.Fragment>
  );
};

Subtasks.propTypes = {
  className: PropTypes.string,
  subtasks: PropTypes.array.isRequired,
};

export default connect (null, {
  addTicketSubtask,
  deleteTicketSubtask,
  editTicketSubtask,
  toggleTicketSubtask,
}) (Subtasks);

/**
 * Subtask Mapper
 * 
 * subtasks
                    .slice (0, rowsPerPage)
                    .map (subtask => (
                      <SubtaskItem
                        key={subtask._id}
                        subtaskId={subtask._id}
                        subtaskSummary={subtask.subtaskSummary}
                        subtaskDescription={subtask.subtaskDescription}
                        date={subtask.date}
                        handleSelectOne={handleSelectOne}
                        selectedItems={selectedItems}
                        projectId={projectId}
                        subtaskActions = {subtaskActions}
                        isCompleted={subtask.isCompleted}
                        ticketId={ticketId}
                      />
                    ))}
 * 
 * 
 */
