import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core';
import {TaskTable, TaskForm} from './components';

const Tasks = props => {
  const {projectId, tasks, user} = props;

  return (
    <Grid item lg={12} md={12} xl={12} xs={12}>
      <TaskForm projectId={projectId} user={user} />
      <TaskTable tasks={tasks} projectId={projectId} />
    </Grid>
  );
};

Tasks.propTypes = {
  projectId: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default Tasks;
