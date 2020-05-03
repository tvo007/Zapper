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
import Subtasks from '../Subtasks';

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';

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
    ticketNumber,
    date,
    id,
    projectId,
    editTicket,
    subtasks,
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

  const [formData, setFormData] = useState ({
    ticketSummary,
    ticketDescription,
  });

  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault ();
    editTicket (projectId, id, formData);
    setFormData (formData);
  };

  return (
    <Dialog
      {...rest}
      open={openModal}
      onClose={handleCloseModal}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="form-dialog-title">Edit Ticket Details</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent>
          <Card {...rest} className={clsx (classes.root, className)}>
            <CardContent>
              <Grid
                container
                spacing={1}
                direction="column"
                style={{margin: '1px'}}
                alignItems="stretch"
              >
                <Grid item md={12} xs={6}>
                  <Typography variant="h3">
                    Ticket # {ticketNumber}
                  </Typography>
                </Grid>
                <Grid item md={12} xs={6}>
                  <Typography />
                </Grid>
                <Grid item md={12} xs={6}>
                  <Typography variant="h3">
                    Summary
                  </Typography>
                </Grid>
                <Grid item md={12} xs={6}>
                  <TextField
                    fullWidth
                    name="ticketSummary"
                    value={formData.ticketSummary}
                    onChange={e => handleChange (e)}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={12} xs={6}>
                  <Typography variant="h3">
                    Description
                  </Typography>
                </Grid>

                <Grid item md={12} xs={6}>
                  <TextField
                    fullWidth
                    name="ticketDescription"
                    value={formData.ticketDescription}
                    onChange={e => handleChange (e)}
                    variant="outlined"
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseModal} color="primary" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
      <DialogTitle id="form-dialog-title">Subtasks</DialogTitle>
      <DialogContent>
        <Grid>
          <Grid>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Add Subtask Summary"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Add Subtask Description"
              type="text"
              fullWidth
              multiline
              rows="4"
            />
          </Grid>
          <Grid>
            <Subtasks subtasks={subtasks} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary">
          Cancel
        </Button>
        <Button color="primary" type="submit">
          <AddIcon />
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
