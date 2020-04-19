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
import {addStory} from '../../../../actions/story';
import AddCircleOutlineRoundedIcon
  from '@material-ui/icons/AddCircleOutlineRounded';

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

  const onSubmit = e => {
    e.preventDefault ();
    addStory (projectId, formData);
    setFormData (initialState);
  };

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <CardHeader title="Stories" />
        {expandForm}
      </div>
      {showFormToggle
        ? <form autoComplete="off" onSubmit={onSubmit}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Enter story summary."
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
                    label="Enter story description."
                    name="storyDescription"
                    value={storyDescription}
                    onChange={e => handleChange (e)}
                    variant="outlined"
                    multiline
                    rows="4"
                    required
                  />
                </Grid>
                <CardActions>
                  <Button color="primary" variant="contained" type="submit">
                    Create Story
                  </Button>
                </CardActions>
              </Grid>

            </CardContent>

          </form>
        : null}
    </Card>
  );
};

StoryForm.propTypes = {
  className: PropTypes.string,
  addStory: PropTypes.func.isRequired,
};

export default connect (null, {addStory}) (StoryForm);
