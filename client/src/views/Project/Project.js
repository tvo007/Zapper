import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import {connect} from 'react-redux';
import {getProject} from '../../actions/project';
import {ProjectDetails} from './components';
import {ProjectDetailsForm, Tasks} from './components';

const useStyles = makeStyles (theme => ({
  root: {
    padding: theme.spacing (4),
  },
}));

const Project = ({getProject, project: {project, loading}, match}) => {
  useEffect (
    () => {
      getProject (match.params.id);
    },
    [getProject, match.params.id]
  );
  const classes = useStyles ();

  


  return loading || project === null
    ? <div>LOADING!</div>
    : <div className={classes.root}>

        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <ProjectDetails
              project={project}
            />
          </Grid>

          <Tasks projectId={project._id} tasks={project.tasks} />

        </Grid>
      </div>;
};

Project.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  project: state.project,
});

export default connect (mapStateToProps, {getProject}) (Project);
