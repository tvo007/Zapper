import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Form from '../../../../components/Forms/Form'
import FormField from '../../../../components/Forms/FormField'
import {connect} from 'react-redux';
import {addProject} from '../../../../actions/project';

const ProjectForm = props => {
  const {className, addProject} = props;

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
    <Form
      formTitle="Create new Project"
      onSubmit={onSubmit}
    >
      <FormField
      formLabel="Enter a project title."
      formName="title"
      formValue={title}
      onChange={onChange}
      />
      <FormField
      formLabel="Enter a project description."
      formName="description"
      formValue={description}
      onChange={onChange}
      />
    </Form>
    
  );
};

ProjectForm.propTypes = {
  className: PropTypes.string,
  addProject: PropTypes.func.isRequired,
};

export default connect (null, {addProject}) (ProjectForm);