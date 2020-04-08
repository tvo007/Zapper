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
import {addTask} from '../../../../actions/project';
import AddCircleOutlineRoundedIcon
  from '@material-ui/icons/AddCircleOutlineRounded';

const initialState = {
  taskSummary: '',
  taskDescription: '',
};

const useStyles = makeStyles (() => ({
  root: {},
}));

const TaskForm = props => {
  const {className, projectId, addTask, ...rest} = props;

  const classes = useStyles ();

  const [formData, setFormData] = useState (initialState);
  const {taskSummary, taskDescription} = formData;

  const [showFormToggle, setShowFormToggle] = useState (false);
  const handleShowForm = () => {
    setShowFormToggle (!showFormToggle);
  };

  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const expandForm = (
    <AddCircleOutlineRoundedIcon type="submit" onClick={handleShowForm} />
  );

  // const [taskSummary, setTaskSummary] = useState ('');
  // const [taskDescription, setTaskDescription] = useState ('');

  // const handleChange = e => {
  //   setTaskDescription (e.target.value);
  // };

  const onSubmit = e => {
    e.preventDefault ();
    addTask (projectId, formData);
    setFormData (initialState);
  };

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <CardHeader title="Tasks" />
        {expandForm}
      </div>
      {showFormToggle
        ? <form autoComplete="off" onSubmit={onSubmit}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Enter task summary."
                    name="taskSummary"
                    value={taskSummary}
                    onChange={e => handleChange (e)}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Enter task description."
                    name="taskDescription"
                    value={taskDescription}
                    onChange={e => handleChange (e)}
                    variant="outlined"
                    multiline
                    rows="4"
                    required
                  />
                </Grid>
                <CardActions>
                  <Button color="primary" variant="contained" type="submit">
                    Create Task
                  </Button>
                </CardActions>
              </Grid>

            </CardContent>

          </form>
        : null}
    </Card>
  );
};

TaskForm.propTypes =  {
  className: PropTypes.string,
  addTask: PropTypes.func.isRequired,
};

export default connect (null, {addTask}) (TaskForm);
