import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import moment from 'moment';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress,
} from '@material-ui/core';

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

const AccountProfile = props => {
  const {
    className,
    profile,
    ...rest
  } = props;

  const classes = useStyles ()

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {profile.status}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {profile.location}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {/*    */}
            </Typography>
          </div>
          <Avatar className={classes.avatar} src={profile.avatar} />
        </div>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography>
          {profile.bio}
        </Typography>
      </CardContent>
      
      
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default AccountProfile;
