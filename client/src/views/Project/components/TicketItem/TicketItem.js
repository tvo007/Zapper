import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  //CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import {connect} from 'react-redux';
import {deleteTicket, toggleTicketCompleted} from '../../../../actions/project';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles (() => ({
  root: {},
}));

const TicketItem = props => {
  const {
    className,
    projectId,
    ticket: {_id, ticketDescription, isCompleted},
    auth,
    deleteTicket,
    toggleTicketCompleted,
    ...rest
  } = props;

  //ticket: {_id, ticketDescription, name, avatar, user, date, isCompleted}

  const classes = useStyles ();

  const toggleHandler = e => toggleTicketCompleted (projectId, _id);
  const deleteHandler = e => deleteTicket (projectId, _id);

  const ticketCompletedStyling = {
    textDecoration: isCompleted ? 'line-through' : null,
  };

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Typography style={ticketCompletedStyling}>
              {' '}{ticketDescription}
            </Typography>
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={toggleHandler}
              >
                <AssignmentTurnedInIcon />
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={deleteHandler}
              >
                <DeleteForeverIcon />
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  );
};

TicketItem.propTypes = {
  className: PropTypes.string,
  projectId: PropTypes.string.isRequired,
  ticket: PropTypes.object.isRequired,
  // auth: PropTypes.object.isRequired,
  deleteTicket: PropTypes.func.isRequired,
  toggleTicketCompleted: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

export default connect (null, {deleteTicket, toggleTicketCompleted}) (
  TicketItem
);
