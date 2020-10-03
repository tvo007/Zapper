import React, {useState} from 'react';
// import clsx from 'clsx';
import PropTypes from 'prop-types';
//import {makeStyles} from '@material-ui/styles';
import {Grid, Button, TextField} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

const initialState = {
  subtaskSummary: '',
  subtaskDescription: '',
};

// const useStyles = makeStyles (() => ({
//   root: {},
// }));

const SubtaskForm = props => {
  const {projectId, taskId, addSubtask} = props;

  const [formData, setFormData] = useState (initialState);

  const {subtaskSummary, subtaskDescription} = formData;

  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault ();
    addSubtask (projectId, taskId, formData);
    setFormData (initialState);
  };

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <Grid>
        <TextField
          autoFocus
          margin="dense"
          name="subtaskSummary"
          label="Add Subtask Summary"
          type="text"
          value={subtaskSummary}
          onChange={e => handleChange (e)}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          name="subtaskDescription"
          label="Add Subtask Description"
          type="text"
          value={subtaskDescription}
          onChange={e => handleChange (e)}
          fullWidth
          multiline
          rows="4"
        />
        <Grid container justify="flex-end">
          <Button color="primary" type="submit">
            <AddIcon />
          </Button>
        </Grid>
      </Grid>

    </form>
  );
};

SubtaskForm.propTypes = {
  className: PropTypes.string,
};

export default SubtaskForm;
