import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core';
import {StoryTable, StoryForm} from './components';

const Stories = props => {
  const {projectId, stories} = props;

  return (
    <Grid item lg={12} md={12} xl={12} xs={12}>
      <StoryForm projectId={projectId} />
      <StoryTable stories={stories} projectId={projectId} />
    </Grid>
  );
};

Stories.propTypes = {
  projectId: PropTypes.string.isRequired,
  stories: PropTypes.array.isRequired,
};

export default Stories;
