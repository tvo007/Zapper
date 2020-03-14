import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from '@material-ui/core';
import {connect} from 'react-redux';
import {
  addTask
} from '../../../../actions/project';

const useStyles = makeStyles (() => ({
  root: {},
}));

const TaskForm = props => {
  const {className, projectId, addTask, ...rest} = props;

  const classes = useStyles ();

  const [taskDescription, setTaskDescription] = useState ('');

  // const handleChange = e => {
  //   setTaskDescription (e.target.value);
  // };

  const onSubmit = e => {
    e.preventDefault ();
    addTask (projectId, {taskDescription});
    setTaskDescription ('');
  };

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <form autoComplete="off" onSubmit={onSubmit}>
        <CardHeader title="Tasks" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Enter a task."
                margin="dense"
                name="text"
                value={taskDescription}
                onChange={e => setTaskDescription (e.target.value)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained" type="submit">
            Create Task
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

TaskForm.propTypes = {
  className: PropTypes.string,
  addTask: PropTypes.func.isRequired,
};

export default connect (null, {addTask}) (TaskForm);
