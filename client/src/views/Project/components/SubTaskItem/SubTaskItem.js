import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardHeader,
  TextField,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import {connect} from 'react-redux';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {deleteSubTask, toggleSubTask} from '../../../../actions/project';

const useStyles = makeStyles (() => ({
  root: {},
}));

const SubTaskItem = props => {
  const {
    className,
    projectId,
    taskId,
    subTaskId,
    subtask: {subTaskSummary, subTaskDescription, isCompleted},
    auth,
    deleteSubTask,
    toggleSubTask,
  } = props;

  //subtask: {_id, taskDescription, name, avatar, user, date, isCompleted}

  const classes = useStyles ();

  const toggleHandler = e => toggleSubTask (projectId, taskId, subTaskId);
  const deleteHandler = e => deleteSubTask (projectId, taskId, subTaskId);

  const taskCompletedStyling = {
    textDecoration: isCompleted ? 'line-through' : null,
  };

  //   const [taskEditToggle, setTaskEditToggle] = useState (false);
  // const [taskItemData, setTaskItemData] = useState (taskDescription);

  //   const handleTaskEditToggle = () => {
  //     setTaskEditToggle (!taskEditToggle);
  //   };

  return (
    <Card className={clsx (classes.root, className)}>
      <CardHeader title={subTaskSummary} style={taskCompletedStyling} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Typography style={taskCompletedStyling}>
              {' '}{subTaskDescription}
            </Typography>

          </Grid>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              type="button"
              onClick={toggleHandler}
            >
              <AssignmentTurnedInIcon />
            </Button>
            <Button color="primary" variant="contained" type="button">
              <EditOutlinedIcon />
            </Button>

            <Button
              color="primary"
              variant="contained"
              type="button"
              onClick={deleteHandler}
            >
              <DeleteForeverIcon />
            </Button>
          </CardActions>
        </Grid>
      </CardContent>

      {/*<CardActions>
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={toggleHandler}
              >
                <AssignmentTurnedInIcon />
              </Button>
              <Button color="primary" variant="contained" type="button">
                <EditOutlinedIcon />
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={deleteHandler}
              >
                <DeleteForeverIcon />
              </Button>
            </CardActions>*/}
    </Card>
  );
};

SubTaskItem.propTypes = {
  className: PropTypes.string,
  //projectId: PropTypes.string.isRequired,
  subtask: PropTypes.object.isRequired,
  // auth: PropTypes.object.isRequired,
  //   deleteTask: PropTypes.func.isRequired,
  //   toggleTaskCompleted: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

export default connect (null, {deleteSubTask, toggleSubTask}) (SubTaskItem);

// export default connect (null, {deleteTask, toggleTaskCompleted}) (TaskItem);
