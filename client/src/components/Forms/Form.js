import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Button,
  CardActions,
  CardHeader,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles (() => ({
  root: {},
}));

const Form = props => {
  const {
    className,
    formTitle,
    onSubmit,
    children,
    submitButtonText,
    ...rest
  } = props;

  const classes = useStyles ();

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <form autoComplete="off" onSubmit={onSubmit}>
        <CardHeader title={formTitle} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {children /**pass field components here */}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <div className={classes.row}>
            <span className={classes.spacer} />
            <Button color="primary" variant="contained" type="submit">
              {submitButtonText}
            </Button>
          </div>

        </CardActions>
      </form>
    </Card>
  );
};

Form.propTypes = {
  className: PropTypes.string,
  formTitle: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string.isRequired,

  // projectId: PropTypes.string.isRequired,
  // ticket: PropTypes.object.isRequired,
  // // auth: PropTypes.object.isRequired,
  // deleteTicket: PropTypes.func.isRequired,
  // toggleTicketCompleted: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

export default Form;
