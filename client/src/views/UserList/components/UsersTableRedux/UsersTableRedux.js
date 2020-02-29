import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from '@material-ui/core';
import {getInitials} from 'helpers';

const useStyles = makeStyles (theme => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing (2),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

//users={profiles}
//users: {user: {_id, name, avatar}, status, company, location, skills}
//users.user
const UsersTableRedux = props => {
  const {className, profiles, ...rest} = props;

  const classes = useStyles ();

  const [selectedUsers, setSelectedUsers] = useState ([]);
  const [rowsPerPage, setRowsPerPage] = useState (10);
  const [page, setPage] = useState (0);

  const handleSelectAll = event => {
    const {profiles} = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = profiles.map (profile => profile.user._id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers (selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf (id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat (selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat (selectedUsers.slice (1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat (selectedUsers.slice (0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat (
        selectedUsers.slice (0, selectedIndex),
        selectedUsers.slice (selectedIndex + 1)
      );
    }

    setSelectedUsers (newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage (page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage (event.target.value);
  };

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === profiles.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                          selectedUsers.length < profiles.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Projects</TableCell>
                  <TableCell>Registration date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profiles.slice (0, rowsPerPage).map (profile => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={profile.user._id}
                    selected={selectedUsers.indexOf (profile.user._id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf (profile.user._id) !== -1}
                        color="primary"
                        onChange={event =>
                          handleSelectOne (event, profile.user._id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={profile.user.avatar}
                        >
                          {getInitials (profile.user.name)}
                        </Avatar>
                        <Typography variant="body1">
                          {profile.user.name}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>{profile.user.email}</TableCell>
                    <TableCell>
                      {profile.location}
                    </TableCell>
                    <TableCell>
                      BRUH
                    </TableCell>
                    <TableCell>
                      {moment (profile.date).format ('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={profiles.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

UsersTableRedux.propTypes = {
  className: PropTypes.string,
  profiles: PropTypes.array.isRequired,
};

export default UsersTableRedux;

//fix user.user
