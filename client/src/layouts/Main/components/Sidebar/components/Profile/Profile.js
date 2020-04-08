import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Avatar, Typography} from '@material-ui/core';

const useStyles = makeStyles (theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing (1),
  },
}));

const Profile = ({className, profile: {profile, loading}}) => {
  const classes = useStyles ();

  return profile === null || loading
    ? <div>LOADING!</div>
    : <div className={clsx (classes.root, className)}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          component={RouterLink}
          src={profile.avatar}
          to="/settings"
        />
        <Typography className={classes.name} variant="h4">
          {profile.user.name}
        </Typography>
        <Typography variant="body2">{profile.bio}</Typography>
      </div>;
};

Profile.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired,
};

export default Profile;
