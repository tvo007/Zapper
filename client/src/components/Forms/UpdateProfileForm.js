import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile} from '../../actions/profile';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  CardActions,
} from '@material-ui/core';

const useStyles = makeStyles (() => ({
  root: {},
}));

const initialState = {
  company: '',
  website: '',
  location: '',
  skills: '',
  bio: '',
  githubusername: '',
  status: '',
  avatar: 'https://img.icons8.com/material-sharp/50/000000/user.png',
};

const UpdateProfileForm = props => {
  const {
    className,
    createProfile,
    // profile,
    history,
    openModal,
    handleCloseModal,
  } = props;

  const classes = useStyles ();

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

  const [formData, setFormData] = useState (initialState);

  const {
    company,
    website,
    location,
    skills,
    githubusername,
    bio,
    status,
    avatar,
    ...rest
  } = formData;

  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault ();
    createProfile (formData, history, true);
  };

  return (
    <Dialog
      {...rest}
      open={openModal}
      onClose={handleCloseModal}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="form-dialog-title">Update your profile!</DialogTitle>
      <DialogContent>
        <form autoComplete="off" onSubmit={e => onSubmit (e)}>
          <Card {...rest} className={clsx (classes.root, className)}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    margin="dense"
                    name="location"
                    onChange={e => handleChange (e)}
                    value={location}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Avatar"
                    margin="dense"
                    name="avatar"
                    onChange={e => handleChange (e)}
                    value={avatar}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Status"
                    margin="dense"
                    name="status"
                    onChange={e => handleChange (e)}
                    value={status}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company"
                    margin="dense"
                    name="company"
                    onChange={e => handleChange (e)}
                    value={company}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Website"
                    margin="dense"
                    name="website"
                    onChange={e => handleChange (e)}
                    value={website}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Github Username"
                    margin="dense"
                    name="githubusername"
                    onChange={e => handleChange (e)}
                    type="text"
                    value={githubusername}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Skills"
                    margin="dense"
                    name="skills"
                    onChange={e => handleChange (e)}
                    type="text"
                    value={skills}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    margin="dense"
                    name="bio"
                    onChange={e => handleChange (e)}
                    value={bio}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button color="primary" variant="contained" type="submit">
                Update Profile
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </CardActions>

          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
};

UpdateProfileForm.propTypes = {
  className: PropTypes.string,
};

export default connect (null, {createProfile}) (UpdateProfileForm);
