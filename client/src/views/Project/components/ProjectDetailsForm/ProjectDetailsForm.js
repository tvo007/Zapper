import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ModalForm from '../../../../components/Modals/ModalForm';
import {connect} from 'react-redux';
import {editProject} from '../../../../actions/project';

const ProjectDetailsForm = props => {
  const {
    projectId,
    // className,
    editProject,
    openModal,
    description,
    handleCloseModal,
    // ...rest
  } = props;

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

  const [formData, setFormData] = useState ({description});

  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault ();
    editProject (projectId, formData);
    setFormData (description);
    handleCloseModal ();
  };

  const hasSecondForm = false;

  const hasRadio = false;

  return (
    <ModalForm
      genericTitle="Edit Project"
      title1="Project Description"
      formLabel1="Enter a project description"
      formName1="description"
      formValue1={formData.description}
      handleChange={handleChange}
      onSubmit={onSubmit}
      openModal={openModal}
      handleCloseModal={handleCloseModal}
      hasSecondForm={hasSecondForm}
      hasRadio={hasRadio}
    />
  );
};

ProjectDetailsForm.propTypes = {
  className: PropTypes.string,
  editProject: PropTypes.func.isRequired,
};

export default connect (null, {editProject}) (ProjectDetailsForm);
