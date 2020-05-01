import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
// import {connect} from 'react-redux';
// import {deleteTicket, toggleTicketCompleted} from '../../../../actions/ticket';

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles (() => ({
  root: {},
}));

const TicketModal = props => {
  const {
    className,
    handleCloseModal,
    openModal,
    ticketSummary,
    ticketDescription,
    date,
    // projectId,
    // ticket: {_id, ticketSummary, ticketDescription, isCompleted},
    // auth,
    // deleteTicket,
    // toggleTicketCompleted,
    ...rest
  } = props;

  //ticket: {_id, ticketDescription, name, avatar, user, date, isCompleted}

  const classes = useStyles ();

  // const toggleHandler = e => toggleTicketCompleted (projectId, _id);
  // const deleteHandler = e => deleteTicket (projectId, _id);

  // const ticketCompletedStyling = {
  //   textDecoration: isCompleted ? 'line-through' : null,
  // };

  return (
    <Dialog
      {...rest}
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="form-dialog-title">Ticket ID placeholder</DialogTitle>
      <DialogContent>
        <Card {...rest} className={clsx (classes.root, className)}>
          <CardHeader title="TESTING" />
        </Card>
        <Typography>
          Summary: {ticketSummary}
        </Typography>
        <Typography>
          Description: {ticketDescription}
        </Typography>
        <Typography>
          add cute form cards here
        </Typography>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Add Subtask"
          type="text"
          fullWidth
          multiline
          rows="4"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCloseModal} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TicketModal.propTypes = {
  className: PropTypes.string,
  // projectId: PropTypes.string.isRequired,
  // ticket: PropTypes.object.isRequired,
  // // auth: PropTypes.object.isRequired,
  // deleteTicket: PropTypes.func.isRequired,
  // toggleTicketCompleted: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

// export default connect (null, {deleteTicket, toggleTicketCompleted}) (
//   TicketModal
// );

export default TicketModal;
