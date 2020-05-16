import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Grid} from '@material-ui/core';
//import moment from 'moment';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  //Avatar,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
//import GetAppIcon from '@material-ui/icons/GetApp';
import BugReportIcon from '@material-ui/icons/BugReport';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles (theme => ({
  root: {},
  details: {
    display: 'flex',
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing (2),
  },
  uploadButton: {
    marginRight: theme.spacing (2),
  },
}));

const ProjectDetails = props => {
  const {
    project: {title, name, description, tasks},
    className,
    handleProjectFormToggle,
    ...rest
  } = props;

  /**
   * project: {
      _id,
      title,
      name,
      description,
      avatar,
      user,
      tasks,
      tickets,
      date,
    },
   */

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
        } return null
      }).length;


  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {title}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              Project Lead: {name}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              Project Members: {name}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              Description: {description}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              Readme: Add a readme section that can be edited here!
            </Typography>
          </div>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          type="button"
          onClick={handleProjectFormToggle}
        >
          <EditIcon />
        </Button>
      </CardActions>
      <Grid container justify="flex-start" spacing={3}>
        <Grid className={classes.statsItem} item>
          <Typography display="inline" variant="body2">
            <AssignmentLateIcon className={classes.statsIcon} />
            {taskTypeCounter (task)} Tasks
          </Typography>
        </Grid>
        <Grid className={classes.statsItem} item>
          <Typography display="inline" variant="body2">
            <MenuBookIcon className={classes.statsIcon} />
            {taskTypeCounter (story)} Stories
          </Typography>
        </Grid>
        <Grid className={classes.statsItem} item>
          <Typography display="inline" variant="body2">
            <BugReportIcon className={classes.statsIcon} />
            {taskTypeCounter (ticket)} Tickets
          </Typography>
        </Grid>
      </Grid>

    </Card>
  );
};

ProjectDetails.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
};

export default ProjectDetails;
