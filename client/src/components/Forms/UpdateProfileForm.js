import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile} from '../../actions/profile';
import {makeStyles} from '@material-ui/styles';
import {Card, CardContent, Grid, CardActions} from '@material-ui/core';
import FormField from './FormField';
import PopupWrapper from '../Modals/PopUpWrapper';
import ButtonTemplate from '../Buttons/ButtonTemplate';

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
    history,
    openModal,
    handleCloseModal,
  } = props;

  const classes = useStyles ();

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

  const onChange = e => {
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
    <PopupWrapper
      openModal={openModal}
      handleCloseModal={handleCloseModal}
      dialogTitle="Update your profile!"
    >
      <form autoComplete="off" onSubmit={e => onSubmit (e)}>
        <Card {...rest} className={clsx (classes.root, className)}>
          <CardContent>
            <Grid container spacing={3}>
              <FormField
                formLabel="Location"
                formName="location"
                formValue={location}
                onChange={onChange}
                isRequired={false}
              />
              <FormField
                formLabel="Avatar"
                formName="avatar"
                formValue={avatar}
                onChange={onChange}
                isRequired={false}
              />
              <FormField
                formLabel="Status"
                formName="status"
                formValue={status}
                onChange={onChange}
                isRequired={false}
              />
              <FormField
                formLabel="Company"
                formName="company"
                formValue={company}
                onChange={onChange}
                isRequired={false}
              />
              <FormField
                formLabel="Website"
                formName="website"
                formValue={website}
                onChange={onChange}
                isRequired={false}
              />
              <FormField
                formLabel="Github username"
                formName="githubusername"
                formValue={githubusername}
                onChange={onChange}
                isRequired={false}
              />
              <FormField
                formLabel="Your skills"
                formName="skills"
                formValue={skills}
                onChange={onChange}
                isRequired={false}
              />
              <FormField
                formLabel="Bio"
                formName="bio"
                formValue={bio}
                onChange={onChange}
                isRequired={false}
              />
            </Grid>
          </CardContent>
          <CardActions>
            <ButtonTemplate type="submit" text="Update Profile" />
            <ButtonTemplate onClick={handleCloseModal} text="Cancel" />
          </CardActions>

        </Card>
      </form>
    </PopupWrapper>
  );
};

UpdateProfileForm.propTypes = {
  className: PropTypes.string,
};

export default connect (null, {createProfile}) (UpdateProfileForm);

