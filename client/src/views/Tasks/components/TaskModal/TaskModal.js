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
import Subtasks from '../../../Subtasks';
import {connect} from 'react-redux';
import {editTask} from '../../../../actions/task';
import useForm from '../../../../utils/useForm';

const useStyles = makeStyles (() => ({
  root: {},
}));

const TaskModal = props => {
  const {
    className,
    handleCloseModal,
    openModal,
    taskSummary,
    taskDescription,
    taskNumber,
    date,
    taskId,
    projectId,
    subtasks,
    user,
    auth,
    editTask,
    ...rest
  } = props;

  const classes = useStyles ();

  const editTaskCallback = () => {
    editTask (projectId, taskId, {
      ...formData,
      taskSummary: formData.taskSummary ? formData.taskSummary : taskSummary,
      taskDescription: formData.taskDescription
        ? formData.taskDescription
        : taskDescription,
    });
  };

  const {onChange, onSubmit, formData} = useForm (editTaskCallback);

  // const [formData, setFormData] = useState ({
  //   taskSummary,
  //   taskDescription,
  // });

  // const handleChange = e => {
  //   setFormData ({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const onSubmit = e => {
  //   e.preventDefault ();
  //   editTask (projectId, taskId, formData);
  //   setFormData (formData);
  // };

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
                      Task # {taskNumber}
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
                      name="taskSummary"
                      value={formData.taskSummary || taskSummary}
                      onChange={e => onChange (e)}
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
                      name="taskDescription"
                      value={formData.taskDescription || taskDescription}
                      onChange={e => onChange (e)}
                      variant="outlined"
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>

              </CardContent>
              <CardActions>
                {!auth.loading && user === auth.user._id
                  ? <Grid container justify="flex-end">
                      <Button onClick={handleCloseModal} color="primary">
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCloseModal}
                        color="primary"
                        type="submit"
                      >
                        Save
                      </Button>
                    </Grid>
                  : <Grid container justify="flex-end">
                      <Button onClick={handleCloseModal} color="primary">
                        Cancel
                      </Button>
                    </Grid>}
              </CardActions>
            </Card>

          </form>
          <DialogActions />
          <Card {...rest} className={clsx (classes.root, className)}>
            <CardHeader title="Subtasks" />
            <CardContent>

              <Subtasks
                subtasks={subtasks}
                taskId={taskId}
                projectId={projectId}
                user={user}
              />
            </CardContent>
          </Card>
        </DialogContent>
      </PerfectScrollbar>
    </Dialog>
  );
};

TaskModal.propTypes = {
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

export default connect (null, {editTask}) (TaskModal);
