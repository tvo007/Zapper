import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Card, CardActions, Button} from '@material-ui/core';
import {connect} from 'react-redux';
import {addTask} from '../../../../actions/task';
import ModalForm from '../../../../components/Modals/ModalForm';
import {useSelector} from 'react-redux';
import useModal from '../../../../utils/useModal';
import useForm from '../../../../utils/useForm';

const useStyles = makeStyles (() => ({
  root: {},
}));

// const initialState = {
//   taskSummary: 'Bruh',
//   taskDescription: "what",
//   taskType: ''
// }

const TaskForm = props => {
  const {user, className, projectId, addTask, ...rest} = props;

  // const dispatch = useDispatch ();

  const auth = useSelector (state => state.auth);
  const classes = useStyles ();

  const {handleOpenModal, handleCloseModal, openModal} = useModal ();

  const addTaskCallback = () => {
    addTask (projectId, formData);
    handleCloseModal ();
  };

  const {formData, onChange, onSubmit} = useForm (addTaskCallback);

  //second form state
  const hasSecondForm = true;
  //radio state
  const hasRadio = true;

  //generic modal

  const showForm = openModal
    ? <ModalForm
        genericTitle="Task"
        title1="Summary"
        title2="Description"
        formLabel1="Enter a task summary."
        formName1="taskSummary"
        formValue1={formData.taskSummary || ''}
        formLabel2="Enter a task description."
        formName2="taskDescription"
        formValue2={formData.taskDescription || ''}
        formLabel3="Enter a task summary."
        formName3="taskType"
        formValue3={formData.taskType || ''}
        handleChange={onChange}
        onSubmit={onSubmit}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        hasSecondForm={hasSecondForm}
        hasRadio={hasRadio}
      />
    : null;

  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      {showForm}
      <CardActions>

        {!auth.loading &&
          user === auth.user._id &&
          <Button
            color="primary"
            variant="contained"
            type="button"
            onClick={handleOpenModal}
          >
            Add Task
          </Button>}
      </CardActions>
    </Card>
  );
};

TaskForm.propTypes = {
  className: PropTypes.string,
  addTask: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

export default connect (null, {addTask}) (TaskForm);
