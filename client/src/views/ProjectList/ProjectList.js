import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProjects} from '../../actions/project';
import {makeStyles} from '@material-ui/styles';
import {IconButton, Grid, Typography} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {ProjectForm, ProjectCard} from './components';

const useStyles = makeStyles (theme => ({
  root: {
    padding: theme.spacing (3),
  },
  content: {
    marginTop: theme.spacing (2),
  },
  pagination: {
    marginTop: theme.spacing (3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));

const ProjectList = ({getProjects, project: {projects, loading}}) => {
  const classes = useStyles ();

  useEffect (
    () => {
      getProjects ();
    },
    [getProjects]
  );

  return (
    <div className={classes.root}>
      <ProjectForm />
      {projects === null || loading
        ? <div>LOADING!</div>
        : <div className={classes.content}>
            <Grid container spacing={3}>
              {projects.map (project => (
                <Grid item key={project._id} lg={4} md={6} xs={12}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
            </Grid>
          </div>}

      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

ProjectList.propTypes = {
  className: PropTypes.string,
  getProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  project: state.project,
});

export default connect (mapStateToProps, {getProjects}) (ProjectList);
