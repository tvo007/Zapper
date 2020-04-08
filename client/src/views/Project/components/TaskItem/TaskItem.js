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
import {
  deleteTask,
  toggleTaskCompleted,
  editTask,
} from '../../../../actions/project';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TaskForm from '../TaskForm';
import SubTaskItem from '../SubTaskItem';
import SubTaskForm from '../SubTaskForm';

const useStyles = makeStyles (() => ({
  root: {},
}));

const TaskItem = props => {
  const {
    className,
    projectId,
    taskId,
    task: {_id, taskSummary, taskDescription, isCompleted, subTasks},
    auth,
    deleteTask,
    toggleTaskCompleted,
    editTask,
    ...rest
  } = props;

  //task: {_id, taskDescription, name, avatar, user, date, isCompleted}

  const classes = useStyles ();
  const [editTaskToggle, setEditTaskToggle] = useState (false);
  const [showSubtasksToggle, setShowSubtasksToggle] = useState (false);
  const [formData, setFormData] = useState ({
    taskSummary,
    taskDescription,
  });

  const toggleHandler = e => toggleTaskCompleted (projectId, _id);
  const deleteHandler = e => deleteTask (projectId, _id);

  const handleShowSubtasks = () => {
    setShowSubtasksToggle (!showSubtasksToggle);
  };

  const taskCompletedStyling = {
    textDecoration: isCompleted ? 'line-through' : null,
  };

  const editTaskToggleHandler = () => {
    setEditTaskToggle (!editTaskToggle);
  };

  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault ();
    editTask (projectId, _id, formData);
    setFormData (formData);
    editTaskToggleHandler ();
  };

  // const [taskItemData, setTaskItemData] = useState (taskDescription);

  // const handleTaskEditToggle = () => {
  //   setTaskEditToggle (!taskEditToggle);
  // };

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      {editTaskToggle
        ? <form onSubmit={onSubmit}>
            <CardHeader title="Edit Task" />
            <CardContent>
              <Grid container spacing={3}>
                <Grid
                  container
                  spacing={3}
                  direction="column"
                  style={{margin: '1px'}}
                  alignItems="stretch"
                >
                  <Grid item md={6} xs={6}>
                    <TextField
                      fullWidth
                      label="Enter task summary."
                      name="taskSummary"
                      value={formData.taskSummary}
                      onChange={e => handleChange (e)}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      fullWidth
                      label="Enter task description."
                      name="taskDescription"
                      value={formData.taskDescription}
                      onChange={e => handleChange (e)}
                      variant="outlined"
                      required
                    />
                  </Grid>
                </Grid>
                <CardActions>
                  <Button color="primary" variant="contained" type="submit">
                    Edit Task
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={editTaskToggleHandler}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </Grid>
            </CardContent>
          </form>
        : <div>
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
                    <Button
                      color="primary"
                      variant="contained"
                      type="button"
                      onClick={handleShowSubtasks}
                    >
                      View Subtasks {subTasks.length}
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      type="button"
                      onClick={editTaskToggleHandler}
                    >
                      Edit Tasks
                    </Button>
                  </CardActions>
                  {showSubtasksToggle
                    ? <div>
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
                      </div>
                    : null}
                </Grid>
              </Grid>
            </CardContent>
          </div>}
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

export default connect (null, {deleteTask, toggleTaskCompleted, editTask}) (
  TaskItem
);
