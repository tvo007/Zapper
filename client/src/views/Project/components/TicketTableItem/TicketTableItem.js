import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Checkbox, TableCell, TableRow, Typography} from '@material-ui/core';
import TicketModal from '../TicketModal';
import moment from 'moment';

const useStyles = makeStyles (() => ({
  root: {},
}));

const TicketTableItem = props => {
  const {
    id,
    ticketSummary,
    ticketDescription,
    date,
    handleSelectOne,
    selectedTickets,
    ...rest
  } = props;

  const [openModal, setOpenModal] = useState (false);

  //ticket: {_id, ticketDescription, name, avatar, user, date, isCompleted}

  const handleClickOpenModal = () => {
    setOpenModal (true);
  };

  const handleCloseModal = () => {
    setOpenModal (false);
  };

  const classes = useStyles ();

  return (
    <TableRow
      className={classes.tableRow}
      hover
      selected={selectedTickets.indexOf (id) !== -1}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedTickets.indexOf (id) !== -1}
          color="primary"
          onChange={event => handleSelectOne (event, id)}
          value="true"
        />
      </TableCell>
      <TableCell>
        <div className={classes.nameContainer}>
          <Typography variant="body1">
            Ticket ID goes here
          </Typography>
        </div>
      </TableCell>
      <TableCell>{ticketSummary}</TableCell>
      <TableCell>
        {ticketDescription}
      </TableCell>
      <TableCell>
        # of subtasks here
      </TableCell>
      <TableCell>
        {moment (date).format ('DD/MM/YYYY')}
      </TableCell>
      <TableCell onClick={handleClickOpenModal}>
        Click here to pull down modal
      </TableCell>
      <TicketModal
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        ticketSummary={ticketSummary}
        ticketDescription={ticketDescription}
        date={date}
      />

    </TableRow>
  );
};

TicketTableItem.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

// export default connect (null, {deleteTicket, toggleTicketCompleted}) (
//   TicketItem
// );

export default TicketTableItem;
