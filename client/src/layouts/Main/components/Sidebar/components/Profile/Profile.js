import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Avatar, Typography, Button} from '@material-ui/core';
import UpdateProfileForm
  from '../../../../../../components/Forms/UpdateProfileForm';

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

  const [openModal, setOpenModal] = useState (false);

  const handleClickOpenModal = () => {
    setOpenModal (true);
  };

  const handleCloseModal = () => {
    setOpenModal (false);
  };

  const showUpdateProfileForm = openModal
    ? <UpdateProfileForm
        profile={profile}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    : null;

  return profile === null || loading
    ? <Button>
        {showUpdateProfileForm}
        <Typography onClick={handleClickOpenModal}>
          Click here to update your avatar and account info.
        </Typography>
      </Button>
    : <div className={clsx (classes.root, className)}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          component={RouterLink}
          src={profile.avatar}
          to="/profile/me"
        />
        <Typography className={classes.name} variant="h4">
          {profile.user.name}
        </Typography>
        <Typography variant="body2">{profile.status}</Typography>
      </div>;
};

Profile.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired,
};

export default Profile;
