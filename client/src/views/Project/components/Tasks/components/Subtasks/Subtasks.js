import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {connect} from 'react-redux';
import {
  addSubtask,
  editSubtask,
  deleteSubtask,
  toggleSubtask,
} from '../../../../../../actions/task';
import {Card, CardActions, CardContent, List} from '@material-ui/core';

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
    addSubtask,
    deleteSubtask,
    editSubtask,
    toggleSubtask,
    taskId,
    user,
    auth,
    ...rest
  } = props;

  const subtaskActions = {
    addSubtask,
    deleteSubtask,
    editSubtask,
    toggleSubtask,
  };

  const classes = useStyles ();

  return (
    <React.Fragment>
      {!auth.loading &&
          user === auth.user._id &&
        <SubtaskForm
          addSubtask={subtaskActions.addSubtask}
          projectId={projectId}
          taskId={taskId}
        />
      }
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
                taskId={taskId}
                user={user}
                auth={auth}
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

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect (mapStateToProps, {
  addSubtask,
  deleteSubtask,
  editSubtask,
  toggleSubtask,
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
                        taskId={taskId}
                      />
                    ))}
 * 
 * 
 */
