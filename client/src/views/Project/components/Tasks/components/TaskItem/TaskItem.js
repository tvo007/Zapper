import React, {useState} from 'react';
//import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Checkbox, TableCell, TableRow, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {
  deleteTask,
  toggleTaskCompleted,
  editTask,
} from '../../../../../../actions/project';
import TaskModal from '../TaskModal';
import moment from 'moment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles (() => ({
  root: {},
}));

const TaskItem = props => {
  const {
    taskId,
    taskSummary,
    taskDescription,
    isCompleted,
    date,
    subtasks,
    handleSelectOne,
    selectedTasks,
    deleteTask,
    toggleTaskCompleted,
    projectId,
    taskNumber,
    editTask,

    //...rest
  } = props;

  const [openModal, setOpenModal] = useState (false);

  //ticket: {_id, ticketDescription, name, avatar, user, date, isCompleted}

  const deleteHandler = e => deleteTask (projectId, taskId);
  const toggleHandler = e => toggleTaskCompleted (projectId, taskId);

  const checkboxChecked = isCompleted ? true : false; //custom hook??

  const handleClickOpenModal = () => {
    setOpenModal (true);
  };

  const handleCloseModal = () => {
    setOpenModal (false);
  };

  const classes = useStyles ();

  return (
    <TableRow
      className={classes.tableRow}
      hover
      selected={selectedTasks.indexOf (taskId) !== -1}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          onChange={event => handleSelectOne (event, taskId)}
          value="true"
          checked={checkboxChecked}
          onClick={toggleHandler}
        />
      </TableCell>
      <TableCell>
        <div className={classes.nameContainer}>
          <Typography variant="body1">
            {taskNumber}
          </Typography>
        </div>
      </TableCell>
      <TableCell>{taskSummary}</TableCell>
      <TableCell>
        {taskDescription}
      </TableCell>
      <TableCell>
        {subtasks.length}
      </TableCell>
      <TableCell>
        {moment (date).format ('DD/MM/YYYY')}
      </TableCell>
      <TableCell>

        <AssignmentIcon onClick={handleClickOpenModal} />

        <DeleteIcon onClick={deleteHandler} />

      </TableCell>
      <TaskModal
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        taskNumber={taskNumber}
        taskSummary={taskSummary}
        taskDescription={taskDescription}
        date={date}
        taskId={taskId}
        projectId={projectId}
        editTask={editTask}
        subtasks={subtasks}
      />

    </TableRow>
  );
};

TaskItem.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

export default connect (null, {
  deleteTask,
  toggleTaskCompleted,
  editTask,
}) (TaskItem);

// export default TicketItem;
