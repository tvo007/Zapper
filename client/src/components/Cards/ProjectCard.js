import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles (theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center',
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing (1),
  },
}));

const ProjectCard = props => {
  const {
    className,
    auth,
    deleteProject,
    project: {_id, title, name, description, tasks},
    ...rest
  } = props;

  const classes = useStyles ();

  const task = 'Task';
  const story = 'Story';
  const ticket = 'Ticket';

  const taskTypeCounter = taskType =>
    tasks
      .map (task => {
        return task;
      })
      .filter (task => {
        if (task.taskType === taskType) {
          return task;
        }
        return null;
      }).length;

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <Typography align="right">
        <DeleteForeverIcon onClick={() => deleteProject (_id)} />
      </Typography>
      <Link to={`/projects/${_id}`}>
        <CardContent>
          <Typography align="center" gutterBottom variant="h4">
            {title}
          </Typography>
          <Typography align="center" variant="body1">
            {description}
          </Typography>
          <Typography align="center" variant="body1">
            Team Lead: {name}
          </Typography>
          <Typography align="center" variant="body1" />
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container justify="space-between">
            <Grid className={classes.statsItem} item>
              <AccessTimeIcon className={classes.statsIcon} />
              <Typography display="inline" variant="body2">
                Updated {/**insert time function here */}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item>
              <AssignmentLateIcon className={classes.statsIcon} />
              <Typography display="inline" variant="body2">
                {taskTypeCounter (task)} Tasks
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item>
              <AssignmentLateIcon className={classes.statsIcon} />
              <Typography display="inline" variant="body2">
                {taskTypeCounter (story)} Stories
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item>
              <AssignmentLateIcon className={classes.statsIcon} />
              <Typography display="inline" variant="body2">
                {taskTypeCounter (ticket)} Tickets
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Link>
    </Card>
  );
};

export default ProjectCard
