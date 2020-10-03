import React from 'react';
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
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';

const useStyles = makeStyles (() => ({
  root: {},
}));

const GenericForm = ({
  title,
  label1,
  name1,
  label2,
  name2,
  name3,
  input1,
  input2,
  input3,
  handleChange,
  onSubmit,
  className,
  derp,
  ...rest
  
}) => {
  const classes = useStyles ();

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <form autoComplete="off" onSubmit={onSubmit}>
        <CardHeader title={title} />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label={label1}
                name={name1}
                value={input1}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label={label2}
                name={name2}
                value={input2}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">Task Type</FormLabel>
                <RadioGroup
                  aria-label="Task Type"
                  name={name3}
                  value={input3}
                  onChange={handleChange}
                >
                  <Grid container>
                    <FormControlLabel
                      value="Task"
                      control={<Radio />}
                      label="Task"
                    />
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
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained" type="submit">
            Create Task
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default GenericForm;
