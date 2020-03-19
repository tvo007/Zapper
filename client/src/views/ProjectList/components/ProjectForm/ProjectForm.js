import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
import {addProject} from '../../../../actions/project';

const useStyles = makeStyles (theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex-start',
    alignItems: 'center',
    marginTop: theme.spacing (1),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing (1),
  },
  exportButton: {
    marginRight: theme.spacing (1),
  },
  searchInput: {
    marginRight: theme.spacing (1),
  },
}));

const ProjectForm = props => {
  const {className, addProject, ...rest} = props;

  const classes = useStyles ();

  const [formData, setFormData] = useState ({
    title: '',
    description: '',
  });

  const {title, description} = formData;

  const onChange = e =>
    setFormData ({...formData, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault ();
    addProject (formData);
  };

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <form autoComplete="off" onSubmit={e => onSubmit (e)}>
        <CardHeader title="Create a Project" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Title"
                margin="dense"
                name="title"
                value={title}
                onChange={e => onChange (e)}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Description"
                margin="dense"
                name="description"
                value={description}
                onChange={e => onChange (e)}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <div className={classes.row}>
            <span className={classes.spacer} />
            <Button color="primary" variant="contained" type="submit">
              Create new project
            </Button>
          </div>
        </CardActions>
      </form>
    </Card>
  );
};

ProjectForm.propTypes = {
  className: PropTypes.string,
  addProject: PropTypes.func.isRequired,
};

export default connect (null, {addProject}) (ProjectForm);
