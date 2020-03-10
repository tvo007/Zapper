import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import {connect} from 'react-redux';
import {getProject} from '../../actions/project';
import {ProjectDetails} from './components';

const useStyles = makeStyles (theme => ({
  root: {
    padding: theme.spacing (4),
  },
}));

const Project = ({getProject, project: {project, loading}, match}) => {
  useEffect (
    () => {
      getProject (project._id);
    },
    [getProject, project._id]
  );
  const classes = useStyles ();

  return (
    <div className={classes.root}>
      {project === null || loading
        ? <div>LOADING!</div>
        : <Grid container spacing={4}>
            <Grid item lg={4} md={6} xl={4} xs={12}>
              <ProjectDetails project={project} />
            </Grid>
            <Grid item lg={8} md={6} xl={8} xs={12}>
              <h2>UNDER CONSTRUCTION: TASK STUFF GOES HERE</h2>
            </Grid>
          </Grid>}
    </div>
  );
};

Project.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  project: state.project,
});

export default connect (mapStateToProps, {getProject}) (Project);
