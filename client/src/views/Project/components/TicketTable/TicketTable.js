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
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from '@material-ui/core';
// import {getInitials} from 'helpers';
// import {connect} from 'react-redux';
// import {deleteTicket, toggleTicketCompleted} from '../../../../actions/ticket';

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

//tickets={project.tickets}
//tickets: {ticket: user, ticketSummary, ticketDescription, name, avatar, date, isCompleted, users, ticketPriority }
const TicketTable = props => {
  const {
    className,
    tickets,
    // tickets: {
    //   ticket: _id,
    //   user,
    //   ticketSummary,
    //   ticketDescription,
    //   name,
    //   avatar,
    //   date,
    //   isCompleted,
    //   users,
    //   ticketPriority,
    // },

    ...rest
  } = props;

  const classes = useStyles ();

  const [selectedTickets, setSelectedTickets] = useState ([]);
  const [rowsPerPage, setRowsPerPage] = useState (10);
  const [page, setPage] = useState (0);

  const handleSelectAll = event => {
    const {tickets} = props;

    let selectedTickets;

    if (event.target.checked) {
      selectedTickets = tickets.map (ticket => ticket._id);
    } else {
      selectedTickets = [];
    }

    setSelectedTickets (selectedTickets);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedTickets.indexOf (id);
    let newSelectedTickets = [];

    if (selectedIndex === -1) {
      newSelectedTickets = newSelectedTickets.concat (selectedTickets, id);
    } else if (selectedIndex === 0) {
      newSelectedTickets = newSelectedTickets.concat (
        selectedTickets.slice (1)
      );
    } else if (selectedIndex === selectedTickets.length - 1) {
      newSelectedTickets = newSelectedTickets.concat (
        selectedTickets.slice (0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedTickets = newSelectedTickets.concat (
        selectedTickets.slice (0, selectedIndex),
        selectedTickets.slice (selectedIndex + 1)
      );
    }

    setSelectedTickets (newSelectedTickets);
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
                      checked={selectedTickets.length === tickets.length}
                      color="primary"
                      indeterminate={
                        selectedTickets.length > 0 &&
                          selectedTickets.length < tickets.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Summary</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.slice (0, rowsPerPage).map (ticket => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={ticket._id}
                    selected={selectedTickets.indexOf (ticket._id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedTickets.indexOf (ticket._id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne (event, ticket._id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">
                          {ticket.ticketSummary}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>{ticket.ticketDescription}</TableCell>
                    <TableCell>
                      {ticket.name}
                    </TableCell>
                    <TableCell>
                      ticket toggle status here
                    </TableCell>
                    <TableCell>
                      {moment (ticket.date).format ('DD/MM/YYYY')}
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
          count={tickets.length}
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

TicketTable.propTypes = {
  className: PropTypes.string,
  tickets: PropTypes.array.isRequired,
};

// export default connect (null, {deleteTicket, toggleTicketCompleted}) (
//   TicketTable
// );

export default TicketTable;
//fix user.user
