import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import {connect} from 'react-redux';
import {getProject} from '../../actions/project';
import {ProjectDetails} from './components';
import {
  TaskForm,
  TaskItem,
  TicketForm,
  TicketItem,
  ProjectDetailsForm,
  StoryForm,
  StoryItem,
  TicketTable,
} from './components';

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

  const [projectFormToggle, setProjectFormToggle] = useState (false);

  const [showTasksToggle, setShowTasksToggle] = useState (true);

  const [showStoriesToggle, setShowStoriesToggle] = useState (true);

  const [showTicketsToggle, setShowTicketsToggle] = useState (false);

  const handleProjectFormToggle = () => {
    setProjectFormToggle (!projectFormToggle);
  };

  const handleShowTasks = () => {
    setShowTasksToggle (!showTasksToggle);
  };

  const handleShowStories = () => {
    setShowStoriesToggle (!showStoriesToggle);
  };

  const handleShowTickets = () => {
    setShowTicketsToggle (!showTicketsToggle);
  };

  const showProjectForm = projectFormToggle
    ? <ProjectDetailsForm
        projectId={project._id}
        projectDescription={project.description}
      />
    : null;

  return loading || project === null
    ? <div>LOADING!</div>
    : <div className={classes.root}>

        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <ProjectDetails
              project={project}
              handleProjectFormToggle={handleProjectFormToggle}
              handleShowTasks={handleShowTasks}
              handleShowTickets={handleShowTickets}
              handleShowStories={handleShowStories}
            />
            {showProjectForm}
          </Grid>
          {showTasksToggle
            ? <Grid item lg={12} md={12} xl={12} xs={12}>
                <TaskForm projectId={project._id} />
                <div>
                  {project.tasks.map (task => (
                    <TaskItem
                      key={task._id}
                      task={task}
                      projectId={project._id}
                      taskId={task._id}
                    />
                  ))}
                </div>
              </Grid>
            : null}
          {showStoriesToggle
            ? <Grid item lg={12} md={12} xl={12} xs={12}>
                <StoryForm projectId={project._id} />
                <div>
                  {project.stories.map (story => (
                    <StoryItem
                      key={story._id}
                      story={story}
                      projectId={project._id}
                      storyId={story._id}
                    />
                  ))}
                </div>
              </Grid>
            : null}
          {showTicketsToggle
            ? <Grid item lg={12} md={12} xl={12} xs={12}>
                <TicketForm projectId={project._id} />
                <div>
                  {project.tickets.map (ticket => (
                    <TicketItem
                      key={ticket._id}
                      ticket={ticket}
                      projectId={project._id}
                    />
                  ))}
                </div>
                <TicketTable tickets={project.tickets} />
              </Grid>
            : null}
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
