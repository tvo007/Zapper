import React from 'react';
//import clsx from 'clsx';
import PropTypes from 'prop-types';
//import {makeStyles} from '@material-ui/styles';
import {TextField, Grid, Button} from '@material-ui/core';
import {connect} from 'react-redux';
import {editSubtask} from '../../../actions/task';
import useForm from '../../../utils/useForm';
import SaveIcon from '@material-ui/icons/Save';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// const useStyles = makeStyles (() => ({
//   root: {},
// }));

const EditForm = props => {
  const {
    //className,
    projectId,
    taskId,
    subtaskId,
    subtaskSummary,
    subtaskDescription,
    editSubtask,
    editToggleHandler,
  } = props;

  const editSubtaskCallback = () => {
    editSubtask (projectId, taskId, subtaskId, {
      ...formData,
      subtaskSummary: formData.subtaskSummary
        ? formData.subtaskSummary
        : subtaskSummary,
      subtaskDescription: formData.subtaskDescription
        ? formData.subtaskDescription
        : subtaskDescription,
    });
    editToggleHandler ();
  };

  const {onChange, onSubmit, formData} = useForm (editSubtaskCallback);

  // const handleChange = e => {
  //   setFormData ({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const onSubmit = e => {
  //   e.preventDefault ();
  //   editSubtask (projectId, taskId, subtaskId, formData);
  //   setFormData (formData);
  //   editToggleHandler ();
  // };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Edit subtask summary."
            name="subtaskSummary"
            value={formData.subtaskSummary || subtaskSummary}
            onChange={e => onChange (e)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>

          <TextField
            fullWidth
            label="Edit subtask description."
            name="subtaskDescription"
            value={formData.subtaskDescription || subtaskDescription}
            onChange={e => onChange (e)}
            variant="outlined"
            multiline
            rows={3}
          />
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="flex-start"
        justify="flex-end"
        direction="row"
      >

        <Button variant="contained" onClick={onSubmit}>
          <SaveIcon />
        </Button>
        <Button variant="contained" onClick={editToggleHandler}>
          <ExitToAppIcon />
        </Button>

      </Grid>

    </form>
  );
};

EditForm.propTypes = {
  className: PropTypes.string,
};

export default connect (null, {editSubtask}) (EditForm);
