import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
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
import {createProfile, getCurrentProfile} from '../../../../actions/profile';

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
  status: ''
};

const AccountDetails = props => {
  const {
    className,
    profile: {profile, loading},
    createProfile,
    getCurrentProfile,
    history,
  } = props;

  const classes = useStyles ();

  const [formData, setFormData] = useState (initialState);

  useEffect (
    () => {
      if (!profile) getCurrentProfile ();
      if (!loading) {
        const profileData = {...initialState};
        for (const key in profile) {
          if (key in profileData) profileData[key] = profile[key];
        }
        setFormData (profileData);
      }
    },
    [loading, getCurrentProfile, profile]
  );

  const {
    company,
    website,
    location,
    skills,
    githubusername,
    bio,
    status,
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
    <Card {...rest} className={clsx (classes.root, className)}>
      <form autoComplete="off" onSubmit={e => onSubmit (e)}>
        <CardHeader title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Location"
                margin="dense"
                name="location"
                onChange={e => handleChange(e)}
                value={location}
                variant="outlined"
              />
              </Grid>
              <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Status"
                margin="dense"
                name="status"
                onChange={e => handleChange(e)}
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
                onChange={e => handleChange(e)}
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
                onChange={e => handleChange(e)}
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
                onChange={e => handleChange(e)}
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
                onChange={e => handleChange(e)}
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
                onChange={e => handleChange(e)}
                value={bio}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect (mapStateToProps, {createProfile, getCurrentProfile}) (
  withRouter (AccountDetails)
);

{/**

  const states = [
    {
      value: 'alabama',
      label: 'Alabama',
    },
    {
      value: 'new-york',
      label: 'New York',
    },
    {
      value: 'san-francisco',
      label: 'San Francisco',
    },
  ];

<TextField
                fullWidth
                label="Select State"
                margin="dense"
                name="state"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{native: true}}
                value={formData.state}
                variant="outlined"
              >
                {states.map (option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>



*/}
