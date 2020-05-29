import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {AppBar, Toolbar, Typography, Grid} from '@material-ui/core';

const useStyles = makeStyles (() => ({
  root: {
    boxShadow: 'none',
  },
}));

const Topbar = props => {
  const {className, ...rest} = props;

  const classes = useStyles ();

  return (
    <AppBar
      {...rest}
      className={clsx (classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          {/* <img
            alt="Logo"
            src="/images/logos/logo--white.svg"
          /> */}

          <h1 style={{color: '#FFF'}}>Zapper</h1>

        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
};

export default Topbar;
