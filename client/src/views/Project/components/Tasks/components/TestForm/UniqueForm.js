import {compose} from 'redux';
import {connect} from 'react-redux';
import GenericForm from './GenericForm';

const mapDispatchToProps = () => {
    return {
      title: 'Tasks',
      label1: 'Enter a task summary.',
      name1: 'taskSummary',
      label2: 'Enter a task description',
      name2: 'taskDescription',
      name3: 'taskType',
      derp: 'Derps'
    };
  };

export const UniqueForm = compose (connect ( null, mapDispatchToProps)) (
  GenericForm
);
