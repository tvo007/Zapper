import React from 'react';
import PropTypes from 'prop-types';
import {Grid, TextField} from '@material-ui/core';

const FormField = props => {
  const {formLabel, formName, formValue, onChange} = props;
  return (
    <Grid item md={6} xs={12}>

      <TextField
        fullWidth
        margin="dense"
        label={formLabel}
        name={formName}
        value={formValue}
        onChange={onChange}
        variant="outlined"
      />
    </Grid>
  );
};

FormField.propTypes = {
    formLabel: PropTypes.string.isRequired,
    formName: PropTypes.string.isRequired,
    formValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,

};

export default FormField;
