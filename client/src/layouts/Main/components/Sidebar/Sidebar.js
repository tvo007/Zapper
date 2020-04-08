import React, {useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Divider, Drawer} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import {getCurrentProfile} from '../../../../actions/profile';

import {Profile, SidebarNav} from './components';

import {connect} from 'react-redux';

const useStyles = makeStyles (theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up ('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing (2),
  },
  divider: {
    margin: theme.spacing (2, 0),
  },
  nav: {
    marginBottom: theme.spacing (2),
  },
}));

const Sidebar = props => {
  const {
    open,
    variant,
    onClose,
    className,
    auth: {user: _id},
    getCurrentProfile,
    profile,
  } = props;

  useEffect (
    () => {
      getCurrentProfile ();
    },
    [getCurrentProfile]
  );

  const authIdRoute = `/profile/${_id}`;
  const classes = useStyles ();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />,
    },
    {
      title: 'Users',
      href: '/users',
      icon: <PeopleIcon />,
    },
    {
      title: 'Projects',
      href: '/projects',
      icon: <ShoppingBasketIcon />,
    },
    {
      title: 'Typography',
      href: '/typography',
      icon: <TextFieldsIcon />,
    },
    {
      title: 'Icons',
      href: '/icons',
      icon: <ImageIcon />,
    },
    {
      title: 'Account',
      href: authIdRoute,
      icon: <AccountBoxIcon />,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{paper: classes.drawer}}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div className={clsx (classes.root, className)}>
        <Profile profile={profile} />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect (mapStateToProps, {getCurrentProfile}) (Sidebar);
