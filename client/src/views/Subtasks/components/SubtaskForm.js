import React from 'react';
// import clsx from 'clsx';
import PropTypes from 'prop-types';
//import {makeStyles} from '@material-ui/styles';
import {Grid, Button, TextField} from '@material-ui/core';
import {addSubtask} from '../../../actions/task';
import {connect} from 'react-redux';
import useForm from '../../../utils/useForm';
import AddIcon from '@material-ui/icons/Add';

const SubtaskForm = props => {
  const {projectId, taskId, addSubtask} = props;

  const addSubtaskCallback = () => {
    addSubtask (projectId, taskId, formData);
  };

  const {formData, onChange, onSubmit} = useForm (addSubtaskCallback);

  return (
    <form autoComplete="off" onSubmit={onSubmit}>
      <Grid>
        <TextField
          autoFocus
          margin="dense"
          name="subtaskSummary"
          label="Add Subtask Summary"
          type="text"
          value={formData.subtaskSummary || ''}
          onChange={e => onChange (e)}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          name="subtaskDescription"
          label="Add Subtask Description"
          type="text"
          value={formData.subtaskDescription || ''}
          onChange={e => onChange (e)}
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

export default connect (null, {addSubtask}) (SubtaskForm);
