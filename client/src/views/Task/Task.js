import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';
import {Grid, Typography, TextField, Button} from '@material-ui/core';
import PageHeader from '../../components/PageHeader/PageHeader';
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {getTask, editTask, addSubtask, deleteSubtask} from '../../actions/task';
import {getProject} from '../../actions/project';
import useForm from '../../utils/useForm';
import {connect} from 'react-redux';

const useStyles = makeStyles (theme => ({
  root: {
    padding: theme.spacing (4),
  },
}));

const Task = ({editTask, addSubtask}) => {
  let history = useHistory ();
  const dispatch = useDispatch ();
  const {projectId, taskId} = useParams ();

  // useEffect (
  //   () => {
  //     dispatch (getTask (projectId, taskId));
  //   },
  //   [dispatch, projectId, taskId]
  // );

  useEffect (
    () => {
      dispatch (getProject (projectId));
    },
    [dispatch, projectId]
  );

  const {loading, project} = useSelector (state => state.project);

  // const {loading, task, project} = useSelector (state => state.project);

  const taskIndex = project.tasks.map (task => task._id).indexOf (taskId);

  const task = project.tasks[taskIndex];

  const editTaskCallback = () => {
    editTask (projectId, taskId, {
      ...formData,
      taskSummary: formData.taskSummary
        ? formData.taskSummary
        : task.taskSummary,
      taskDescription: formData.taskDescription
        ? formData.taskDescription
        : task.taskDescription,
    });
  };

  const {formData, onChange, onSubmit} = useForm (editTaskCallback);
  const auth = useSelector (state => state.auth);

  // const {routeChange} = usePath (`/projects/${projectId}`);

  // const {routeChange2} = usePath (`/projects/${projectId}/tasks/${taskId}`);

  const routeToProject = () => {
    history.push (`/projects/${projectId}`);
  };

  const routeToTask = () => {
    history.push (`/projects/${projectId}/tasks/${taskId}`);
  };
  const classes = useStyles ();

  return loading || task === null
    ? <Typography>LOADING!</Typography>
    : <div className={classes.root}>

        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <PageHeader
              title={task.taskSummary}
              text1={project.title}
              text2={task.taskSummary}
              routeToProject={routeToProject}
              routeToTask={routeToTask}
            >
              <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={onSubmit}
              >
                <Grid container direction="column" spacing={3}>
                  <Grid item sm={3}>
                    <TextField
                      id="standard-basic"
                      label="Summary"
                      fullWidth
                      multiline
                      variant="outlined"
                      onChange={onChange}
                      name="taskSummary"
                      defaultValue={task.taskSummary}
                      value={formData.taskSummary}
                    />
                  </Grid>

                  <Grid item sm={8}>
                    <TextField
                      label="Description"
                      fullWidth
                      multiline
                      variant="outlined"
                      rows={3}
                      onChange={onChange}
                      name="taskDescription"
                      defaultValue={task.taskDescription}
                      value={formData.taskDescription}
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" type="submit">
                      Save
                    </Button>
                  </Grid>
                </Grid>

              </form>
            </PageHeader>
          </Grid>

          <Grid
            container
            direction="column"
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <Typography>
              TASK component tasks:
            </Typography>
            <Typography>
              Task acts as container
              getTask
            </Typography>
            <Typography>
              add dummy components such as:
            </Typography>
            <Typography>
              Header
            </Typography>
            <Typography>
              subtask views
            </Typography>
            <Typography />

          </Grid>

        </Grid>
      </div>;
};

Task.propTypes = {
  //   projectId: PropTypes.string.isRequired,
  //   tasks: PropTypes.array.isRequired,
};

export default connect (null, {editTask, addSubtask}) (Task);
