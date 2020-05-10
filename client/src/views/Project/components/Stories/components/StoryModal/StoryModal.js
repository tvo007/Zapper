import React, {useState} from 'react';
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
} from '@material-ui/core';
import Subtasks from '../Subtasks';

const useStyles = makeStyles (() => ({
  root: {},
}));

const StoryModal = props => {
  const {
    className,
    handleCloseModal,
    openModal,
    storySummary,
    storyDescription,
    storyNumber,
    date,
    storyId,
    projectId,
    editStory,
    subtasks,
    // projectId,
    // ticket: {_id, storySummary, storyDescription, isCompleted},
    // auth,
    // deleteTicket,
    // toggleTicketCompleted,
    ...rest
  } = props;

  //ticket: {_id, storyDescription, name, avatar, user, date, isCompleted}

  const classes = useStyles ();

  // const toggleHandler = e => toggleTicketCompleted (projectId, _id);
  // const deleteHandler = e => deleteTicket (projectId, _id);

  // const ticketCompletedStyling = {
  //   textDecoration: isCompleted ? 'line-through' : null,
  // };

  const [formData, setFormData] = useState ({
    storySummary,
    storyDescription,
  });

  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault ();
    editStory (projectId, storyId, formData);
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
      <PerfectScrollbar>
        <DialogTitle id="form-dialog-title">Edit Task Details</DialogTitle>

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
                  <Grid item md={12} xs={6}>
                    <Typography variant="h4">
                      Story # {storyNumber}
                    </Typography>
                  </Grid>
                  <Grid item md={12} xs={6}>
                    <Typography />
                  </Grid>
                  <Grid item md={12} xs={6}>
                    <Typography variant="h4">
                      Summary
                    </Typography>
                  </Grid>
                  <Grid item md={12} xs={6}>
                    <TextField
                      fullWidth
                      name="storySummary"
                      value={formData.storySummary}
                      onChange={e => handleChange (e)}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item md={12} xs={6}>
                    <Typography variant="h4">
                      Description
                    </Typography>
                  </Grid>

                  <Grid item md={12} xs={6}>
                    <TextField
                      fullWidth
                      name="storyDescription"
                      value={formData.storyDescription}
                      onChange={e => handleChange (e)}
                      variant="outlined"
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>

              </CardContent>

            </Card>

          </form>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCloseModal} color="primary" type="submit">
              Save
            </Button>
          </DialogActions>
          <Card {...rest} className={clsx (classes.root, className)}>
            <CardHeader title="Subtasks" />
            <CardContent>

              <Subtasks
                subtasks={subtasks}
                storyId={storyId}
                projectId={projectId}
              />
            </CardContent>
          </Card>
        </DialogContent>
      </PerfectScrollbar>
    </Dialog>
  );
};

StoryModal.propTypes = {
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

export default StoryModal;