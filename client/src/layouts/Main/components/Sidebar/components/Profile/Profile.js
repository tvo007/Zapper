import React, {useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Avatar, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../../../../../actions/profile';

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

const Profile = ({
  className,
  getCurrentProfile,
  auth: {user},
  profile: {profile, loading}
}) => {
  useEffect (
    () => {
      getCurrentProfile ();
    },
    [getCurrentProfile]
  );

  const classes = useStyles ();

  
    return profile === null || loading ? <div>LOADING!</div> :
    <div className={clsx (classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={profile.user.avatar}
        to="/settings"
      />
      <Typography className={classes.name} variant="h4">
        {profile.user.name}
      </Typography>
      <Typography variant="body2">{profile.bio}</Typography>
    </div>
  
};

Profile.propTypes = {
  className: PropTypes.string,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect (mapStateToProps, {getCurrentProfile}) (Profile);


{/**
 * import React, {useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Avatar, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../../../../../actions/profile';

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

const Profile = ({
  className,
  getCurrentProfile,
  auth: {user},
  profile: {profile, loading}
}) => {
  useEffect (
    () => {
      getCurrentProfile ();
    },
    [getCurrentProfile]
  );

  const classes = useStyles ();

  
    return loading && profile === null ? <div>LOADING!</div> :
    <div className={clsx (classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={profile.user.avatar}
        to="/settings"
      />
      <Typography className={classes.name} variant="h4">
        {profile.user.name}
      </Typography>
      <Typography variant="body2">{profile.bio}</Typography>
    </div>
  
};

Profile.propTypes = {
  className: PropTypes.string,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect (mapStateToProps, {getCurrentProfile}) (Profile);
 * 
 */}

 {/**
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: 'Shen Zhi',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;


*/}