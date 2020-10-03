import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile, getCurrentProfile} from '../../../../actions/profile';
import Form from '../../../../components/Forms/Form';
import FormField from '../../../../components/Forms/FormField';

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

const AccountDetails = props => {
  const {
    profile: {profile, loading},
    createProfile,
    getCurrentProfile,
    history,
  } = props;

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
    avatar,
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
    <Form formTitle="Your Profile" submitButtonText="Update Profile" onSubmit={onSubmit}>
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
        formValue={skills.toString()}
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
    </Form>
  );
};

//skills is an array...

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

