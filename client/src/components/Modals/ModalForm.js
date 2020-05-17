import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CardActions,
} from '@material-ui/core';

const useStyles = makeStyles (() => ({
  root: {},
}));

const ModalForm = props => {
  const {
    className,
    genericTitle,
    title1,
    title2,
    title3,
    label1,
    name1,
    label2,
    name2,
    name3,
    input1,
    input2,
    input3,
    handleChange,
    onSubmit,
    openModal,
    handleCloseModal,
    ...rest
  } = props;

  //ticket: {_id, taskDescription, name, avatar, user, date, isCompleted}

  const classes = useStyles ();

  return (
    <Dialog
      {...rest}
      open={openModal}
      onClose={handleCloseModal}
      fullWidth
      maxWidth="lg"
    >
      <PerfectScrollbar>
        <DialogTitle id="form-dialog-title">{genericTitle} Form</DialogTitle>

        <DialogContent>
          <form onSubmit={onSubmit}>
            <Card {...rest} className={clsx (classes.root, className)}>
              <CardHeader title={title1} />
              <CardContent>
                <Grid
                  container
                  spacing={1}
                  direction="column"
                  style={{margin: '1px'}}
                  alignItems="stretch"
                >
                  <Grid item md={12} xs={6}>
                    <TextField
                      fullWidth
                      label={label1}
                      name={name1}
                      value={input1}
                      onChange={handleChange}
                      variant="outlined"
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>

              </CardContent>
              <CardActions>
                <Grid container justify="flex-end">
                  <Button onClick={handleCloseModal} color="primary">
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                  >
                    Save
                  </Button>
                </Grid>
              </CardActions>
            </Card>
          </form>
        </DialogContent>
      </PerfectScrollbar>
    </Dialog>
  );
};

ModalForm.propTypes = {
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

export default ModalForm;


/**
 * 
 * <ModalForm
      genericTitle={genericTitle}
      title1={projectTitle}
      name1={name1}
      label={label1}
      handleChange={handleChange}
      onSubmit={onSubmit}
      handleCloseModal={handleCloseModal}
      openModal={openModal}
      input1={description.projectDescription}
    />
 */