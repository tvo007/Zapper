import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  //CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import {connect} from 'react-redux';
import {deleteTask, toggleTaskCompleted} from '../../../../actions/project';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles (() => ({
  root: {},
}));

const TaskItem = props => {
  const {
    className,
    projectId,
    task: {_id, taskDescription, isCompleted},
    auth,
    deleteTask,
    toggleTaskCompleted,
    ...rest
  } = props;

  //task: {_id, taskDescription, name, avatar, user, date, isCompleted}

  const classes = useStyles ();

  const toggleHandler = e => toggleTaskCompleted (projectId, _id);
  const deleteHandler = e => deleteTask (projectId, _id);

  const taskCompletedStyling = {
    textDecoration: isCompleted ? 'line-through' : null,
  };

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
            <Typography style={taskCompletedStyling}> {taskDescription}</Typography>
            <CardActions>
          <Button color="primary" variant="contained" type="button" onClick={toggleHandler}>
            <AssignmentTurnedInIcon />
          </Button>
          <Button color="primary" variant="contained" type="button" onClick={deleteHandler}>
          <DeleteForeverIcon />
          </Button>
        </CardActions>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
    </Card>
  );
};

TaskItem.propTypes = {
  className: PropTypes.string,
  projectId: PropTypes.string.isRequired,
  task: PropTypes.object.isRequired,
  // auth: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTaskCompleted: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

export default connect (null, {deleteTask, toggleTaskCompleted}) (TaskItem);