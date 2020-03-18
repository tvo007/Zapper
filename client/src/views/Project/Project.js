import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import {connect} from 'react-redux';
import {getProject} from '../../actions/project';
import {ProjectDetails} from './components';
import {TaskForm, TaskItem, TicketForm, TicketItem, ProjectDetailsForm} from './components';

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
            <ProjectDetails project={project} />
            <ProjectDetailsForm projectId={project._id}/>
          </Grid>
          <Grid item lg={4} md={4} xl={4} xs={12}>
            <TaskForm projectId={project._id} />
            <div>
              {project.tasks.map (task => (
                <TaskItem key={task._id} task={task} projectId={project._id} />
              ))}
            </div>
          </Grid>
          <Grid item lg={4} md={4} xl={4} xs={12}>
            <TicketForm projectId={project._id} />
            <div>
              {project.tickets.map (ticket => (
                <TicketItem key={ticket._id} ticket={ticket} projectId={project._id} />
              ))}
            </div>
          </Grid>
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

{
  /**
loading || project === null
        ? <div>LOADING!</div>
        :  

        original task form grid/to be deleted later
   <Grid item lg={8} md={6} xl={8} xs={12}> 
            <TaskForm projectId={project._id}/>
            <div className='comments'>
            {project.tasks.map(task => (
                <TaskItem key={task._id} task={task} projectId={project._id} />
            ))}
        </div>
          </Grid>     
        
        
        
        


        */
}
