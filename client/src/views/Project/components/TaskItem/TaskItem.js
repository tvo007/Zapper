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
import {deleteTask, toggleTaskCompleted} from '../../../../actions/project';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SubTaskItem from '../SubTaskItem';
import SubTaskForm from '../SubTaskForm';

const useStyles = makeStyles (() => ({
  root: {},
}));

const TaskItem = props => {
  const {
    className,
    projectId,
    task: {task, _id, taskSummary, taskDescription, isCompleted, subTasks},
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

  const [taskEditToggle, setTaskEditToggle] = useState (false);
  // const [taskItemData, setTaskItemData] = useState (taskDescription);

  const handleTaskEditToggle = () => {
    setTaskEditToggle (!taskEditToggle);
  };

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <CardHeader title={taskSummary} style={taskCompletedStyling} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Typography style={taskCompletedStyling}>
              Description: {taskDescription}
            </Typography>
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
            <SubTaskForm projectId={projectId} taskId={_id} />
            <CardContent>
              <div>
                {subTasks.map (subtask => (
                  <SubTaskItem
                    key={subtask._id}
                    subTaskId={subtask._id}
                    subtask={subtask}
                    taskId={_id}
                    projectId={projectId}
                  />
                ))}
              </div>
            </CardContent>
          </Grid>
        </Grid>
      </CardContent>
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

{
  /**

<CardContent>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Task Description"
            margin="dense"
            name="taskDescription"
            value={taskItemData}
            onChange={e => setTaskItemData (e.target.value)}
            variant="outlined"
          />
        </Grid>
      </CardContent>

*/
}
