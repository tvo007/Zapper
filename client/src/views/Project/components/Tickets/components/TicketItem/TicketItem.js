import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Checkbox, TableCell, TableRow, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {
  deleteTicket,
  toggleTicketCompleted,
} from '../../../../../../actions/ticket';
import TicketModal from '../TicketModal';
import moment from 'moment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles (() => ({
  root: {},
}));

const TicketItem = props => {
  const {
    id,
    ticketSummary,
    ticketDescription,
    date,
    handleSelectOne,
    selectedTickets,
    deleteTicket,
    toggleTicketCompleted,
    projectId,
    ticketNumber,
    ...rest
  } = props;

  const [openModal, setOpenModal] = useState (false);

  //ticket: {_id, ticketDescription, name, avatar, user, date, isCompleted}

  const deleteHandler = e => deleteTicket (projectId, id);
  const toggleHandler = e => toggleTicketCompleted (projectId, id);

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
          onClick={toggleHandler}
        />
      </TableCell>
      <TableCell>
        <div className={classes.nameContainer}>
          <Typography variant="body1">
            {ticketNumber}
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
      <TableCell>

        <AssignmentIcon onClick={handleClickOpenModal} />
        
        <DeleteIcon onClick={deleteHandler} />

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

TicketItem.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

export default connect (null, {deleteTicket, toggleTicketCompleted}) (
  TicketItem
);

// export default TicketItem;
