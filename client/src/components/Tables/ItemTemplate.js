import React from 'react';
//import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Checkbox, TableCell, TableRow, Typography,  } from '@material-ui/core';
import moment from 'moment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles (() => ({
  root: {},
}));

const ItemTemplate = props => {
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
    deleteTask,
    toggleTaskCompleted,
    projectId,
    taskNumber,
    editTask,
    taskType,
    checkboxChecked,
    toggleHandler,
    handleClickOpenModal,
    deleteHandler,
    children,

    //...rest
  } = props;

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
            {shortId}
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
      
      {children}

    </TableRow>
  );
};

ItemTemplate.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

export default ItemTemplate

// export default TicketItem;


/**
 * <TaskModal
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
 */