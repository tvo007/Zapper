import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import {getProject} from '../../actions/project';
import {getTasks} from '../../actions/task';
import {ProjectDetails} from './components';
import Tasks from '../Tasks'; //import Tasks component, one level up
//converting into hooks
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';

const useStyles = makeStyles (theme => ({
  root: {
    padding: theme.spacing (4),
  },
}));

const Project = props => {
  const dispatch = useDispatch ();
  const {projectId} = useParams ();

  useEffect (
    () => {
      dispatch (getProject (projectId));
    },
    [dispatch, projectId]
  );

  // useEffect (
  //   () => {
  //     dispatch (getTasks (projectId));
  //   },
  //   [dispatch, projectId]
  // );

  const {project, loading} = useSelector (state => state.project);

  const auth = useSelector (state => state.auth);

  const classes = useStyles ();

  return loading || project === null
    ? <div>LOADING!</div>
    : <div className={classes.root}>

        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <ProjectDetails project={project} auth={auth} />
          </Grid>

          <Tasks
            projectId={project._id}
            tasks={project.tasks}
            user={project.user}
          />

        </Grid>
      </div>;
};

Project.propTypes = {
  getProject: PropTypes.func,
  project: PropTypes.object,
};

// const mapStateToProps = state => ({
//   project: state.project,
//   auth: state.auth,
// });

// export default connect (mapStateToProps, {getProject}) (Project);

export default Project;
