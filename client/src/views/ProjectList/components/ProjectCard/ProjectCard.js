import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteProject} from '../../../../actions/project';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  CardHeader,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
//import GetAppIcon from '@material-ui/icons/GetApp';
import BugReportIcon from '@material-ui/icons/BugReport';
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
    product,
    auth,
    deleteProject,
    project: {_id, title, name, description, tasks, tickets},
    showActions,
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
                {tasks.length} Tasks
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item>
              <BugReportIcon className={classes.statsIcon} />
              <Typography display="inline" variant="body2">
                {tickets.length} Tickets
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Link>
    </Card>
  );
};

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect (mapStateToProps, {deleteProject}) (ProjectCard);
