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
  LinearProgress,
} from '@material-ui/core';
//import GetAppIcon from '@material-ui/icons/GetApp';
import BugReportIcon from '@material-ui/icons/BugReport';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
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
    project: {title, name, description, tasks, tickets},
    className,
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
      <Button color="primary" variant="contained" type="button">
          <EditIcon />
        </Button>
        <Button color="primary" variant="contained" type="button">
          View Tasks
        </Button>
        <Button color="primary" variant="contained" type="button">
          View Tickets
        </Button>
      </CardActions>
      <Grid container justify="flex-start">
        <Grid className={classes.statsItem} item>
          <Typography display="inline" variant="body2">
            <AssignmentLateIcon className={classes.statsIcon} />
            {tasks.length} Tasks
          </Typography>
        </Grid>
        <Grid className={classes.statsItem} item>
          <Typography display="inline" variant="body2">
            <BugReportIcon className={classes.statsIcon} />
            {tickets.length} Tickets
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
