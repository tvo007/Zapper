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
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
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
    formLabel1,
    formLabel2,
    formLabel3,
    formName1,
    formName2,
    formName3,
    formValue1,
    formValue2,
    formValue3,
    handleChange,
    onSubmit,
    openModal,
    handleCloseModal,
    hasRadio,
    hasSecondForm,
    ...rest
  } = props;

  //ticket: {_id, taskDescription, name, avatar, user, date, isCompleted}

  const classes = useStyles ();

  const showSecondForm = hasSecondForm ? 
  <Grid
  item
  container
  direction="column"
  md={12}
  xs={6}
  spacing={2}
>
  <Grid item>
    <Typography variant="h3">
      {title2}:
    </Typography>
  </Grid>
  <Grid item>
    <TextField
      fullWidth
      label={formLabel2}
      name={formName2}
      value={formValue2}
      onChange={handleChange}
      variant="outlined"
      multiline
      rows={3}
    />
  </Grid>
</Grid>: null;

  const showTaskTypeRadio = hasRadio
    ? <Grid item md={12} xs={12}>
        <FormControl component="fieldset" required>
          <FormLabel component="legend">Task Type</FormLabel>
          <RadioGroup
            aria-label="Task Type"
            name={formName3}
            value={formValue3}
            onChange={handleChange}
          >
            <Grid container>
              <FormControlLabel value="Task" control={<Radio />} label="Task" />
              <FormControlLabel
                value="Story"
                control={<Radio />}
                label="Story"
              />
              <FormControlLabel
                value="Ticket"
                control={<Radio />}
                label="Ticket"
              />
            </Grid>
          </RadioGroup>
        </FormControl>
      </Grid>
    : null;

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
              <CardContent>
                <Grid
                  container
                  spacing={1}
                  direction="column"
                  style={{margin: '1px'}}
                  alignItems="stretch"
                >
                  <Grid
                    item
                    container
                    direction="column"
                    spacing={2}
                    md={12}
                    xs={6}
                  >
                    <Grid item>
                      <Typography variant="h3">
                        {title1}:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        label={formLabel1}
                        name={formName1}
                        value={formValue1}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={3}
                      />
                    </Grid>
                  </Grid>
                  {showSecondForm}
                  {showTaskTypeRadio}
                </Grid>
              </CardContent>
              <CardActions>
                <Grid container justify="flex-end">
                  <Button onClick={handleCloseModal} color="primary">
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
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
