import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import {connect} from 'react-redux';
import {getProfileById} from '../../actions/profile';
import {AccountProfile, AccountDetails} from './components';

const useStyles = makeStyles (theme => ({
  root: {
    padding: theme.spacing (4),
  },
}));

const Account = ({
  getProfileById,
  profile: {profile, loading},
  auth: {user},
}) => {
  useEffect (
    () => {
      getProfileById (user._id);
    },
    [getProfileById, user._id]
  );
  const classes = useStyles ();

  return (
    <div className={classes.root}>
      {profile === null || loading
        ? <div>LOADING!</div>
        : <Grid container spacing={4}>
            <Grid item lg={4} md={6} xl={4} xs={12}>
              <AccountProfile profile={profile} />
            </Grid>
            <Grid item lg={8} md={6} xl={8} xs={12}>
              <AccountDetails profile={profile} />
            </Grid>
          </Grid>}
    </div>
  );
};

Account.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect (mapStateToProps, {getProfileById}) (Account);
