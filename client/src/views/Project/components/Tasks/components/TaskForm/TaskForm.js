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
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import {connect} from 'react-redux';
import {addTask} from '../../../../../../actions/task';

const initialState = {
  taskSummary: '',
  taskDescription: '',
  taskType: 'Task',
};

const useStyles = makeStyles (() => ({
  root: {},
}));

const TaskForm = props => {
  const {className, projectId, addTask, ...rest} = props;

  const classes = useStyles ();

  const [formData, setFormData] = useState (initialState);

  const {taskSummary, taskDescription, taskType} = formData;

  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e =>  {
    e.preventDefault ();
    addTask (projectId, formData);
    setFormData (initialState);
  };

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <form autoComplete="off" onSubmit={onSubmit}>
        <CardHeader title="Tasks" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Enter a task summary."
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
                label="Enter a task description."
                name="taskDescription"
                value={taskDescription}
                onChange={e => handleChange (e)}
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">Task Type</FormLabel>
                <RadioGroup
                  aria-label="Task Type"
                  name="taskType"
                  value={taskType}
                  onChange={handleChange}
                >
                  <Grid container>
                    <FormControlLabel
                      value="Task"
                      control={<Radio />}
                      label="Task"
                    />
                    <FormControlLabel
                      value="Story"
                      control={<Radio />}
                      label="Story"
                    />
                    <FormControlLabel
                      value="Ticket"
                      control={<Radio />}
                      label="Ticket"
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>
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
