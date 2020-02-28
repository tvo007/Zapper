import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
// import {UsersToolbar} from './components'
import {connect} from 'react-redux';
import {getProfiles} from '../../actions/profile';
import { UsersTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      {/**UsersToolbar would go here */}
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

// UserList.propTypes = {
//   getProfiles: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired,
// };

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect (mapStateToProps, {getProfiles})(UserList);

//took out Ussers toolbar for now



