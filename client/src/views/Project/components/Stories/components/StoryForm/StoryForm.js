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
import {addStory} from '../../../../../../actions/story';

const initialState = {
  storySummary: '',
  storyDescription: '',
};

const useStyles = makeStyles (() => ({
  root: {},
}));

const StoryForm = props => {
  const {className, projectId, addStory, ...rest} = props;

  const classes = useStyles ();

  const [formData, setFormData] = useState (initialState);

  const {storySummary, storyDescription} = formData;

  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault ();
    addStory (projectId, formData);
    setFormData (initialState);
  };

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <form autoComplete="off" onSubmit={onSubmit}>
        <CardHeader title="Stories" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Enter a story summary."
                name="storySummary"
                value={storySummary}
                onChange={e => handleChange (e)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Enter a story description."
                name="storyDescription"
                value={storyDescription}
                onChange={e => handleChange (e)}
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained" type="submit">
            Create Story
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

StoryForm.propTypes = {
  className: PropTypes.string,
  addStory: PropTypes.func.isRequired,
};

export default connect (null, {addStory}) (StoryForm);
