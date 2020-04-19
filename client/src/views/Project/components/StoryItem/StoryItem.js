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
  deleteStory,
  toggleStoryCompleted,
  editStory,
} from '../../../../actions/story';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import StoryForm from '../StoryForm';
import StorySubtaskItem from '../StorySubtaskItem';
import StorySubtaskForm from '../StorySubtaskForm';

const useStyles = makeStyles (() => ({
  root: {},
}));

const StoryItem = props => {
  const {
    className,
    projectId,
    storyId,
    story: {_id, storySummary, storyDescription, isCompleted, subTasks},
    auth,
    deleteStory,
    toggleStoryCompleted,
    editStory,
    ...rest
  } = props;

  const classes = useStyles ();
  const [editStoryToggle, setEditStoryToggle] = useState (false);
  const [showSubtasksToggle, setShowSubtasksToggle] = useState (false);
  const [formData, setFormData] = useState ({
    storySummary,
    storyDescription,
  });

  const toggleHandler = e => toggleStoryCompleted (projectId, _id);
  const deleteHandler = e => deleteStory (projectId, _id);

  const handleShowSubtasks = () => {
    setShowSubtasksToggle (!showSubtasksToggle);
  };

  const storyCompletedStyling = {
    textDecoration: isCompleted ? 'line-through' : null,
  };

  const editStoryToggleHandler = () => {
    setEditStoryToggle (!editStoryToggle);
  };

  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault ();
    editStory (projectId, _id, formData);
    setFormData (formData);
    editStoryToggleHandler ();
  };

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      {editStoryToggle
        ? <form onSubmit={onSubmit}>
            <CardHeader title="Edit Story" />
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
                      label="Enter story summary."
                      name="storySummary"
                      value={formData.storySummary}
                      onChange={e => handleChange (e)}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      fullWidth
                      label="Enter story description."
                      name="storyDescription"
                      value={formData.storyDescription}
                      onChange={e => handleChange (e)}
                      variant="outlined"
                      required
                    />
                  </Grid>
                </Grid>
                <CardActions>
                  <Button color="primary" variant="contained" type="submit">
                    Edit Story
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={editStoryToggleHandler}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </Grid>
            </CardContent>
          </form>
        : <div>
            <CardHeader title={storySummary} style={storyCompletedStyling} />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Typography style={storyCompletedStyling}>
                    Description: {storyDescription}
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
                    <Button
                      color="primary"
                      variant="contained"
                      type="button"
                      onClick={editStoryToggleHandler}
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
                    <Button
                      color="primary"
                      variant="contained"
                      type="button"
                      onClick={handleShowSubtasks}
                    >
                      View Subtasks {subTasks.length}
                    </Button>
                  </CardActions>

                  {showSubtasksToggle
                    ? <div>
                        <StorySubtaskForm projectId={projectId} storyId={_id} />
                        <CardContent>
                          <div>
                            {subTasks.map (subtask => (
                              <StorySubtaskItem
                                key={subtask._id}
                                subTaskId={subtask._id}
                                subtask={subtask}
                                storyId={_id}
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

StoryItem.propTypes = {
  className: PropTypes.string,
  projectId: PropTypes.string.isRequired,
  story: PropTypes.object.isRequired,
  // auth: PropTypes.object.isRequired,
  editStory: PropTypes.func.isRequired,
  deleteStory: PropTypes.func.isRequired,
  toggleStoryCompleted: PropTypes.func.isRequired,
};

export default connect (null, {deleteStory, toggleStoryCompleted, editStory}) (
  StoryItem
);
