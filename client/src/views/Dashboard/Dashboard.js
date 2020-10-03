import React, {useEffect} from 'react';
// import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import ProjectCard from '../../components/Cards/ProjectCard';
import {Card, CardHeader, CardContent} from '@material-ui/core';
import GridWrapper from '../../components/Grids/GridWrapper';
import GridItem from '../../components/Grids/GridItem';
import {connect} from 'react-redux';
import {getProjects, deleteProject} from '../../actions/project';
// import { deleteTask } from 'actions/task';

// const useStyles = makeStyles (theme => ({
//   root: {
//     padding: theme.spacing (3),
//   },
//   content: {
//     marginTop: theme.spacing (2),
//   },
//   pagination: {
//     marginTop: theme.spacing (3),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
// }));

const useStyles = makeStyles (theme => ({
  root: {
    padding: theme.spacing (4),
  },
}));

const Dashboard = ({
  getProjects,
  project: {projects, loading},
  auth,
  auth: {user: {_id}},
}) => {
  const classes = useStyles ();

  useEffect (
    () => {
      getProjects ();
    },
    [getProjects]
  );

  //filter out your projects here!!

  //display your projects filtered out from all projects

  const myProjects = projects.map (project => {
    if (project.user === _id) {
      return (
        <GridItem key={project._id}>
          <ProjectCard
            project={project}
            auth={auth}
            deleteProject={deleteProject}
          />
        </GridItem>
      );
    } else {
      return null;
    }
  });

  return (
    <div className={classes.root}>

      <GridWrapper>
        <Card>
          <CardHeader title="Your Dashboard" />
          <CardContent>
            {projects === null || loading
              ? <div>LOADING!</div>
              : <div>
                  <GridWrapper>
                    {myProjects}
                  </GridWrapper>
                </div>}
          </CardContent>
        </Card>
      </GridWrapper>

    </div>
  );
};

Dashboard.propTypes = {
  // getProjects: PropTypes.func.isRequired,
  // project: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth,
});

export default connect (mapStateToProps, {getProjects, deleteProject}) (
  Dashboard
);
