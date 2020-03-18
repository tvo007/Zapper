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
import {editProject} from '../../../../actions/project';
import project from 'reducers/project';

const useStyles = makeStyles (() => ({
  root: {},
}));

const ProjectDetailsForm = props => {
  const {
    projectId,
    className,
    editProject,
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

  const [description, setDescription] = useState ('');

  // const handleChange = e => {
  //   setTaskDescription (e.target.value);
  // };

  const onSubmit = e => {
    e.preventDefault ();
    editProject (projectId, {description});
  };

  return (
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

ProjectDetailsForm.propTypes = {
  className: PropTypes.string,
  editProject: PropTypes.func.isRequired,
};

export default connect (null, {editProject}) (ProjectDetailsForm);
