import React, {useState} from 'react';
//import clsx from 'clsx';
import PropTypes from 'prop-types';
//import {makeStyles} from '@material-ui/styles';
import { 
  TextField,  
  Grid,
  Button,
} from '@material-ui/core';

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

  //const classes = useStyles ();

  const [formData, setFormData] = useState ({
    subtaskSummary,
    subtaskDescription,
  });

  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault ();
    editSubtask (projectId, taskId, subtaskId, formData);
    setFormData (formData);
    editToggleHandler ();
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Edit subtask summary."
            name="subtaskSummary"
            value={formData.subtaskSummary}
            onChange={e => handleChange (e)}
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>

          <TextField
            fullWidth
            label="Edit subtask description."
            name="subtaskDescription"
            value={formData.subtaskDescription}
            onChange={e => handleChange (e)}
            variant="outlined"
            multiline
            rows={3}
            required
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

export default EditForm;
