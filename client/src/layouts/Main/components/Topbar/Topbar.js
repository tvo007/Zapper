import React, {useState} from 'react';
import {Link as RouterLink, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../../../actions/auth';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {AppBar, Toolbar, Badge, Hidden, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles (theme => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing (1),
  },
}));

const Topbar = props => {
  const {className, onSidebarOpen, logout, ...rest} = props;

  const {isAuthenticated} = props.auth;
  const classes = useStyles ();

  const [notifications] = useState ([]);

  const signOutHandler = e => {
    e.preventDefault ();
    logout ();
  };

  if (!isAuthenticated) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <AppBar {...rest} className={clsx (classes.root, className)}>
      <Toolbar>
        <RouterLink to="/" style={{ color: '#FFF' }}>
          <h1>BRUH PROJECT</h1>
          {/** <img alt="Logo" src="/images/logos/logo--white.svg" />*/}
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={e => signOutHandler (e)}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect (mapStateToProps, {logout}) (Topbar);
