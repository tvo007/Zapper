import React from 'react';
import PropTypes from 'prop-types';
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
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import BugReportIcon from '@material-ui/icons/BugReport';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';

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
    project: {
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
    showActions,
    ...rest
  } = props;

  const classes = useStyles ();

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
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
    </Card>
  );
};

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect (mapStateToProps, {deleteProject}) (ProjectCard);

{
  /**
<Card {...rest} className={clsx (classes.root, className)}>
      <CardContent>
        <div className={classes.imageContainer}>
          <img alt="Product" className={classes.image} src={product.imageUrl} />
        </div>
        <Typography align="center" gutterBottom variant="h4">
          {product.title}
        </Typography>
        <Typography align="center" variant="body1">
          {product.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              Updated 2hr ago
            </Typography>
          </Grid>
          <Grid className={classes.statsItem} item>
            <GetAppIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              {product.totalDownloads} Downloads
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card> */
}
