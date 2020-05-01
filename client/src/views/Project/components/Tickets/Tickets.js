//tickets wrapper component goes here
//wrap form, ticketTable

import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import {TicketTable, TicketForm} from './components';

const Tickets = props => {
  const {
      projectId,
      tickets
  } = props;

  return (
    <Grid item lg={12} md={12} xl={12} xs={12}>
      <TicketForm projectId={projectId} />
      <TicketTable tickets={tickets} projectId={projectId} />
    </Grid>
  );
};

export default Tickets;
