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
import {addSubTask} from '../../../../actions/project';
import AddCircleOutlineRoundedIcon
  from '@material-ui/icons/AddCircleOutlineRounded';

const initialState = {
  subTaskSummary: '',
  subTaskDescription: '',
};

const useStyles = makeStyles (() => ({
  root: {},
}));

const SubTaskForm = props => {
  const {className, projectId, taskId, addSubTask} = props;

  const classes = useStyles ();

  const [formData, setFormData] = useState (initialState);

  const {subTaskSummary, subTaskDescription} = formData;
  const [addSubtaskToggle, setAddSubtaskToggle] = useState (false);

  const handleAddTaskToggle = () => {
    setAddSubtaskToggle (!addSubtaskToggle);
  };
  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const expandForm = (
    <AddCircleOutlineRoundedIcon type="submit" onClick={handleAddTaskToggle} />
  );

  // const [taskSummary, setTaskSummary] = useState ('');
  // const [taskDescription, setTaskDescription] = useState ('');

  // const handleChange = e => {
  //   setTaskDescription (e.target.value);
  // };

  const onSubmit = e => {
    e.preventDefault ();
    addSubTask (projectId, taskId, formData);
    setFormData (initialState);
    handleAddTaskToggle ();
  };

  return (
    <Card className={clsx (classes.root, className)}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <CardHeader title="SubTasks" />
        {expandForm}
      </div>
      {addSubtaskToggle
        ? <form autoComplete="off" onSubmit={onSubmit}>

            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Enter subtask summary."
                    name="subTaskSummary"
                    value={subTaskSummary}
                    onChange={e => handleChange (e)}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Enter subtask description."
                    name="subTaskDescription"
                    value={subTaskDescription}
                    onChange={e => handleChange (e)}
                    variant="outlined"
                    multiline
                    rows="4"
                    required
                  />
                </Grid>
              </Grid>
            </CardContent>

            <Divider />
            <CardActions>
              <Button color="primary" variant="contained" type="submit">
                Create Subtask
              </Button>
            </CardActions>

          </form>
        : null}
    </Card>
  );
};

SubTaskForm.propTypes = {
  className: PropTypes.string,
  addSubTask: PropTypes.func.isRequired,
};

export default connect (null, {addSubTask}) (SubTaskForm);