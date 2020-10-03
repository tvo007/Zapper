import React, {useState} from 'react';
// import clsx from 'clsx';
import PropTypes from 'prop-types';
// import {makeStyles} from '@material-ui/styles';
import {connect} from 'react-redux';
import {addTask} from '../../../../../../actions/task';
import {UniqueForm} from './UniqueForm';

const initialState = {
  taskSummary: '',
  taskDescription: '',
  taskType: 'Task',
};

// const useStyles = makeStyles (() => ({
//   root: {},
// }));

const TestForm = props => {
  const { projectId, addTask} = props;

  // const classes = useStyles ();

  const [formData, setFormData] = useState (initialState);

  // const {taskSummary, taskDescription, taskType} = formData;

  const handleChange = e => {
    setFormData ({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault ();
    addTask (projectId, formData);
    setFormData (initialState);
  };

  return <UniqueForm handleChange={handleChange} onSubmit={onSubmit} />;
};

TestForm.propTypes = {
  className: PropTypes.string,
  addTask: PropTypes.func.isRequired,
};

export default connect (null, {addTask}) (TestForm);
