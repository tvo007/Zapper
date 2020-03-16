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
import {
  addTicket
} from '../../../../actions/project';

const useStyles = makeStyles (() => ({
  root: {},
}));

const TicketForm = props => {
  const {className, projectId, addTicket, ...rest} = props;

  const classes = useStyles ();

  const [ticketDescription, setTicketDescription] = useState ('');

  // const handleChange = e => {
  //   setTaskDescription (e.target.value);
  // };

  const onSubmit = e => {
    e.preventDefault ();
    addTicket (projectId, {ticketDescription});
    setTicketDescription ('');
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
                name="text"
                value={ticketDescription}
                onChange={e => setTicketDescription (e.target.value)}
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
