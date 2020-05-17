import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
//import ModalForm from '../../../../components/Modals/ModalForm';
import {connect} from 'react-redux';
import {editProject} from '../../../../actions/project';

const useStyles = makeStyles (() => ({
  root: {},
}));

const ProjectDetailsForm = props => {
  const {
    projectId,
    className,
    editProject,
    openModal,
    description,
    handleCloseModal,
    title,
    ...rest
  } = props;

  /**
   * project: {
      _id,
      title,
      name,
      description,
      avatar,
      user,
      tasks,
      tickets,
      date,
    },
   */

  const classes = useStyles ();

  const [formData, setFormData] = useState ({description});

  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleChange = e => {
  //   setDescription (e.target.value);
  // };

  // const handleChange = e => {
  //   setFormData (e.target.value);
  // };

  // const genericTitle = 'Project';
  // const name1 = 'projectDescription';
  // const label1 = 'Enter project description.';

  const onSubmit = e => {
    e.preventDefault ();
    editProject (projectId, formData);
    setFormData (description);
    handleCloseModal ();
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
        <DialogTitle id="form-dialog-title">Edit Project Info</DialogTitle>

        <DialogContent>
          <form onSubmit={onSubmit}>
            <Card {...rest} className={clsx (classes.root, className)}>
              <CardHeader title={title} />
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
                      label="Enter a project description."
                      name="description"
                      value={formData.description}
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
                  <Button
                    type="button"
                    onClick={handleCloseModal}
                    color="primary"
                  >
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

ProjectDetailsForm.propTypes = {
  className: PropTypes.string,
  editProject: PropTypes.func.isRequired,
};

export default connect (null, {editProject}) (ProjectDetailsForm);

/**
 * return (
    <Card className={clsx (classes.root, className)}>
      <form autoComplete="off" onSubmit={onSubmit}>
        <CardHeader title="Project Details Form" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Enter project details."
                name="description"
                value={description}
                onChange={e => setDescription (e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained" type="submit">
            Update Project Details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};
 * 
 * 
 * 
 * 
 * 
 */
