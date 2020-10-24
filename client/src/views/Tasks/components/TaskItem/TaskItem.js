import React from 'react';
import {useHistory} from 'react-router-dom';
//import clsx from 'clsx';
import PropTypes from 'prop-types';
import ItemTemplate from '../../../../components/Tables/ItemTemplate';
import {useSelector, useDispatch} from 'react-redux';
import useModal from '../../../../utils/useModal';
import {deleteTask, toggleTaskCompleted} from '../../../../actions/task';
import TaskModal from '../TaskModal/TaskModal';
import {Link} from '@material-ui/core';

const TaskItem = props => {
  const {
    taskId,
    shortId,
    taskSummary,
    taskDescription,
    isCompleted,
    date,
    subtasks,
    handleSelectOne,
    selectedTasks,
    projectId,
    taskNumber,
    taskType,
    user,
    //...rest
  } = props;

  let history = useHistory ();

  // const {routeChange} = usePath (`/projects/${projectId}/tasks/${taskId}`);

  // const {handleOpenModal, handleCloseModal, openModal} = useModal ();

  const auth = useSelector (state => state.auth);
  const dispatch = useDispatch ();

  const deleteHandler = e => dispatch (deleteTask (projectId, taskId));
  const toggleHandler = e => dispatch (toggleTaskCompleted (projectId, taskId));

  const checkboxChecked = isCompleted ? true : false; //custom hook??

  const routeToTask = () => {
    history.push (`/projects/${projectId}/tasks/${taskId}`);
  };

  // const classes = useStyles ();

  return (
    <ItemTemplate
      taskId={taskId}
      shortId={shortId}
      taskSummary={taskSummary}
      taskDescription={taskDescription}
      isCompleted={isCompleted}
      date={date}
      subtasks={subtasks}
      handleSelectOne={handleSelectOne}
      selectedTasks={selectedTasks}
      deleteTask={deleteTask}
      toggleTaskCompleted={toggleTaskCompleted}
      projectId={projectId}
      taskNumber={taskNumber}
      taskType={taskType}
      checkboxChecked={checkboxChecked}
      toggleHandler={toggleHandler}
      deleteHandler={deleteHandler}
      auth={auth}
      user={user}
      routeChange={routeToTask}
    />
  );
};

TaskItem.propTypes = {
  className: PropTypes.string,
};

// export default connect (null, {
//   deleteTask,
//   toggleTaskCompleted,
//   editTask,
// }) (TaskItem);

export default TaskItem;
