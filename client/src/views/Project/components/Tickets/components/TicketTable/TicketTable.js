import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
// import TicketModal from '../TicketModal';
import TicketItem from '../TicketItem';
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
    projectId,
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

  /**testing functions for the modal drop down */
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
                    />
                  </TableCell>
                  <TableCell>Ticket #</TableCell>
                  <TableCell>Summary</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Subtasks</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>More Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets
                  .slice (0, rowsPerPage)
                  .map (ticket => (
                    <TicketItem
                      key={ticket._id}
                      id={ticket._id}
                      ticketSummary={ticket.ticketSummary}
                      ticketDescription={ticket.ticketDescription}
                      date={ticket.date}
                      handleSelectOne={handleSelectOne}
                      selectedTickets={selectedTickets}
                      projectId={projectId}
                      ticketNumber={ticket.ticketNumber}
                    />
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

//line 137/Checkbox props: placeholder for onChange={handleChangeAll}
/**
 * <TicketItem
                      key={ticket._id}
                      id={ticket._id}
                      ticketSummary={ticket.ticketSummary}
                      ticketDescription={ticket.ticketDescription}
                      date={ticket.date}
                      handleSelectOne={handleSelectOne}
                      selectedTickets={selectedTickets}
                      projectId={projectId}
                      ticketNumber={ticket.ticketNumber}
                    />
 * 
 * 
 */
