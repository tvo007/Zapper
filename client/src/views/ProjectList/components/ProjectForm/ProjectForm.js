import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../../../components/Forms/Form';
import FormField from '../../../../components/Forms/FormField';
import {connect} from 'react-redux';
import {addProject} from '../../../../actions/project';
import useForm from '../../../../utils/useForm';

const ProjectForm = props => {
  const {addProject} = props;

  const addProjectCallback = () => {
    addProject (formData);
  };

  const {formData, onChange, onSubmitFieldClear} = useForm (addProjectCallback);

  return (
    <Form
      formTitle="Create new Project"
      submitButtonText="Create Project"
      onSubmit={onSubmitFieldClear}
    >
      <FormField
        formLabel="Enter a project title."
        formName="title"
        formValue={formData.title || ''}
        onChange={onChange}
        isRequired={true}
      />
      <FormField
        formLabel="Enter a project description."
        formName="description"
        formValue={formData.description || ''}
        onChange={onChange}
        isRequired={true}
      />
    </Form>
  );
};

ProjectForm.propTypes = {
  className: PropTypes.string,
  addProject: PropTypes.func.isRequired,
};

export default connect (null, {addProject}) (ProjectForm);
