import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Checkbox, TableCell, TableRow, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {
  deleteTicket,
  toggleTicketCompleted,
  editTicket,
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
    ticketId,
    ticketSummary,
    ticketDescription,
    isCompleted,
    date,
    subtasks,
    handleSelectOne,
    selectedTickets,
    deleteTicket,
    toggleTicketCompleted,
    projectId,
    ticketNumber,
    editTicket,

    ...rest
  } = props;

  const [openModal, setOpenModal] = useState (false);

  //ticket: {_id, ticketDescription, name, avatar, user, date, isCompleted}

  const deleteHandler = e => deleteTicket (projectId, ticketId);
  const toggleHandler = e => toggleTicketCompleted (projectId, ticketId);

  const checkboxChecked = isCompleted ? true : false; //custom hook??

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
      selected={selectedTickets.indexOf (ticketId) !== -1}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedTickets.indexOf (ticketId) !== -1}
          color="primary"
          onChange={event => handleSelectOne (event, ticketId)}
          value="true"
          checked={checkboxChecked}
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
        ticketNumber={ticketNumber}
        ticketSummary={ticketSummary}
        ticketDescription={ticketDescription}
        date={date}
        ticketId={ticketId}
        projectId={projectId}
        editTicket={editTicket}
        subtasks={subtasks}
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

export default connect (null, {
  deleteTicket,
  toggleTicketCompleted,
  editTicket,
}) (TicketItem);

// export default TicketItem;
