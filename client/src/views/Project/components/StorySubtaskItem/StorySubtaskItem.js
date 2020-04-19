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
import {
  deleteStorySubtask,
  toggleStorySubtask,
  editStorySubtask,
} from '../../../../actions/story';

const useStyles = makeStyles (() => ({
  root: {},
}));

const StorySubtaskItem = props => {
  const {
    className,
    projectId,
    storyId,
    subTaskId,
    subtask: {subTaskSummary, subTaskDescription, isCompleted},
    auth,
    deleteStorySubtask,
    toggleStorySubtask,
    editStorySubtask,
  } = props;

  const classes = useStyles ();

  const toggleHandler = e => toggleStorySubtask (projectId, storyId, subTaskId);
  const deleteHandler = e => deleteStorySubtask (projectId, storyId, subTaskId);

  const [editSubtaskToggle, setEditSubtaskToggle] = useState (false);
  const [formData, setFormData] = useState ({
    subTaskSummary,
    subTaskDescription,
  });

  const subtaskCompletedStyling = {
    textDecoration: isCompleted ? 'line-through' : null,
  };

  const editSubtaskToggleHandler = () => {
    setEditSubtaskToggle (!editSubtaskToggle);
  };

  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault ();
    editStorySubtask (projectId, storyId, subTaskId, formData);
    setFormData (formData);
    editSubtaskToggleHandler ();
  };

  return (
    <Card className={clsx (classes.root, className)}>
      {editSubtaskToggle
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
                      label="Enter story subtask summary."
                      name="subTaskSummary"
                      value={formData.subTaskSummary}
                      onChange={e => handleChange (e)}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      fullWidth
                      label="Enter story subtask description."
                      name="subTaskDescription"
                      value={formData.subTaskDescription}
                      onChange={e => handleChange (e)}
                      variant="outlined"
                      required
                    />
                  </Grid>
                </Grid>
                <CardActions>
                  <Button color="primary" variant="contained" type="submit">
                    Edit Subtask
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={editSubtaskToggleHandler}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </Grid>
            </CardContent>
          </form>
        : <div>
            <CardHeader
              title={subTaskSummary}
              style={subtaskCompletedStyling}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Typography style={subtaskCompletedStyling}>
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
                  <Button
                    color="primary"
                    variant="contained"
                    type="button"
                    onClick={editSubtaskToggleHandler}
                  >
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
          </div>}
    </Card>
  );
};

StorySubtaskItem.propTypes = {
  className: PropTypes.string,
  //projectId: PropTypes.string.isRequired,
  subtask: PropTypes.object.isRequired,
  // auth: PropTypes.object.isRequired,
  //   deleteTask: PropTypes.func.isRequired,
  //   toggleTaskCompleted: PropTypes.func.isRequired,
};

export default connect (null, {
  deleteStorySubtask,
  toggleStorySubtask,
  editStorySubtask,
}) (StorySubtaskItem);
