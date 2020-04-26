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
  TextField,
} from '@material-ui/core';
import {connect} from 'react-redux';
import {addTicket} from '../../../../actions/ticket';

const initialState = {
  ticketSummary: '',
  ticketDescription: '',
};

const useStyles = makeStyles (() => ({
  root: {},
}));

const TicketForm = props => {
  const {className, projectId, addTicket, ...rest} = props;

  const classes = useStyles ();

  const [formData, setFormData] = useState (initialState);

  const {ticketSummary, ticketDescription} = formData;

  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault ();
    addTicket (projectId, formData);
    setFormData (initialState);
  };

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <form autoComplete="off" onSubmit={onSubmit}>
        <CardHeader title="Tickets" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Enter a ticket summary."
                name="ticketSummary"
                value={ticketSummary}
                onChange={e => handleChange (e)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Enter a ticket summary."
                name="ticketDescription"
                value={ticketDescription}
                onChange={e => handleChange (e)}
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained" type="submit">
            Create Ticket
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

TicketForm.propTypes = {
  className: PropTypes.string,
  addTicket: PropTypes.func.isRequired,
};

export default connect (null, {addTicket}) (TicketForm);
