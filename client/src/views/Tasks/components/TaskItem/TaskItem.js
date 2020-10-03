import React from 'react';
//import clsx from 'clsx';
import PropTypes from 'prop-types';
import ItemTemplate from '../../../../components/Tables/ItemTemplate';
import {useSelector, useDispatch} from 'react-redux';
import useModal from '../../../../utils/useModal';
import {deleteTask, toggleTaskCompleted} from '../../../../actions/task';
import TaskModal from '../TaskModal/TaskModal';

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

  const {handleOpenModal, handleCloseModal, openModal} = useModal ();

  const auth = useSelector (state => state.auth);
  const dispatch = useDispatch ();

  const deleteHandler = e => dispatch (deleteTask (projectId, taskId));
  const toggleHandler = e => dispatch (toggleTaskCompleted (projectId, taskId));

  const checkboxChecked = isCompleted ? true : false; //custom hook??

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
      handleOpenModal={handleOpenModal}
      deleteHandler={deleteHandler}
      auth={auth}
      user={user}
    >
      <TaskModal
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        taskNumber={taskNumber}
        taskSummary={taskSummary}
        taskDescription={taskDescription}
        date={date}
        taskId={taskId}
        projectId={projectId}
        subtasks={subtasks}
        auth={auth}
        user={user}
      />

    </ItemTemplate>
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
