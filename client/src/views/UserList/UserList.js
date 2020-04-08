import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/styles';
// import {UsersToolbar} from './components'
import {connect} from 'react-redux';
import {getProfiles} from '../../actions/profile';
import {UsersTable} from './components';

const useStyles = makeStyles (theme => ({
  root: {
    padding: theme.spacing (3),
  },
  content: {
    marginTop: theme.spacing (2),
  },
}));

const UserList = ({getProfiles, profile: {profiles, loading}}) => {
  const classes = useStyles ();

  useEffect (
    () => {
      getProfiles ();
    },
    [getProfiles]
  );

  return loading && profiles === null
    ? <div>LOADING!</div>
    : <div className={classes.root}>
        {/**UsersToolbar would go here */}
        <div className={classes.content}>
          <UsersTable profiles={profiles} />
        </div>
      </div>;
};

// UserList.propTypes = {
//   getProfiles: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired,
// };

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect (mapStateToProps, {getProfiles}) (UserList);

//took out Ussers toolbar for now

//how to incorporate UsersTableRedux into single index

//replace users prop in UsersTableRedux to profiles => profiles={profiles}
