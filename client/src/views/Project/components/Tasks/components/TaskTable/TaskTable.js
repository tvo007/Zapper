import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Grid,
  Button,
} from '@material-ui/core';
import TaskItem from '../TaskItem';
// import { TaskItem } from '../TaskItem';
// import {getInitials} from 'helpers';
// import {connect} from 'react-redux';
// import {deleteTicket, toggleTicketCompleted} from '../../../../actions/ticket';

const useStyles = makeStyles (theme => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing (2),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

//tasks={project.tasks}
//tasks: {ticket: user, tasksummary, ticketDescription, name, avatar, date, isCompleted, users, ticketPriority }
const TaskTable = props => {
  const {
    className,
    tasks,
    projectId,
    // tasks: {
    //   ticket: _id,
    //   user,
    //   tasksummary,
    //   ticketDescription,
    //   name,
    //   avatar,
    //   date,
    //   isCompleted,
    //   users,
    //   ticketPriority,
    // },

    ...rest
  } = props;

  const classes = useStyles ();

  const [selectedTasks, setSelectedTasks] = useState ([]);
  const [rowsPerPage, setRowsPerPage] = useState (10);
  const [page, setPage] = useState (0);

  const [taskFilter, setTaskFilter] = useState (false);
  const [storyFilter, setStoryFilter] = useState (false);
  const [ticketFilter, setTicketFilter] = useState (false);

  const taskView = taskFilter ? 'Task' : null;

  const storyView = storyFilter ? 'Story' : null;

  const ticketView = ticketFilter ? 'Ticket' : null;


  const taskFilterHandle = () => {
    
    if (taskFilter) {
      setStoryFilter (false);
      setTicketFilter (false);
    }

    setTaskFilter (!taskFilter);
  };

  const storyFilterHandle = () => {
    
    if (storyFilter) {
      setTaskFilter (false);
      setTicketFilter (false);
    }

    setStoryFilter (!storyFilter);
  };
  const ticketFilterHandle = () => {
    
    if (ticketFilter) {
      setStoryFilter (false);
      setTaskFilter (false);
    }

    setTicketFilter (!ticketFilter);
  };

  

  
  // const handleSelectAll = event => {
  //   const {tasks} = props;

  //   let selectedtasks;

  //   if (event.target.checked) {
  //     selectedtasks = tasks.map (ticket => ticket._id);
  //   } else {
  //     selectedtasks = [];
  //   }

  //   setSelectedtasks (selectedtasks);
  // };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedTasks.indexOf (id);
    let newSelectedTasks = [];

    if (selectedIndex === -1) {
      newSelectedTasks = newSelectedTasks.concat (selectedTasks, id);
    } else if (selectedIndex === 0) {
      newSelectedTasks = newSelectedTasks.concat (selectedTasks.slice (1));
    } else if (selectedIndex === selectedTasks.length - 1) {
      newSelectedTasks = newSelectedTasks.concat (selectedTasks.slice (0, -1));
    } else if (selectedIndex > 0) {
      newSelectedTasks = newSelectedTasks.concat (
        selectedTasks.slice (0, selectedIndex),
        selectedTasks.slice (selectedIndex + 1)
      );
    }

    setSelectedTasks (newSelectedTasks);
  };

  const handlePageChange = (event, page) => {
    setPage (page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage (event.target.value);
  };

  /**testing functions for the modal drop down */
  return (
    <Card {...rest} className={clsx (classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <Grid>
            <Button onClick={taskFilterHandle}>Task View</Button>
            <Button onClick={storyFilterHandle}>Story View</Button>
            <Button onClick={ticketFilterHandle}>Ticket View</Button>
          </Grid>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedTasks.length === tasks.length}
                      color="primary"
                      indeterminate={
                        selectedTasks.length > 0 &&
                          selectedTasks.length < tasks.length
                      }
                    />
                  </TableCell>
                  <TableCell>Task Type</TableCell>
                  <TableCell>Summary</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Subtasks</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>More Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.slice (0, rowsPerPage).map (task => {
                  if (task.taskType === taskView) {
                    return (
                      <TaskItem
                        key={task._id}
                        taskId={task._id}
                        taskSummary={task.taskSummary}
                        taskDescription={task.taskDescription}
                        isCompleted={task.isCompleted}
                        date={task.date}
                        handleSelectOne={handleSelectOne}
                        selectedTasks={selectedTasks}
                        projectId={projectId}
                        taskNumber={task.taskNumber}
                        subtasks={task.subtasks}
                        taskType={task.taskType}
                      />
                    );
                  } else if (task.taskType === storyView) {
                    return (
                      <TaskItem
                        key={task._id}
                        taskId={task._id}
                        taskSummary={task.taskSummary}
                        taskDescription={task.taskDescription}
                        isCompleted={task.isCompleted}
                        date={task.date}
                        handleSelectOne={handleSelectOne}
                        selectedTasks={selectedTasks}
                        projectId={projectId}
                        taskNumber={task.taskNumber}
                        subtasks={task.subtasks}
                        taskType={task.taskType}
                      />
                    );
                  } else if (task.taskType === ticketView) {
                    return (
                      <TaskItem
                        key={task._id}
                        taskId={task._id}
                        taskSummary={task.taskSummary}
                        taskDescription={task.taskDescription}
                        isCompleted={task.isCompleted}
                        date={task.date}
                        handleSelectOne={handleSelectOne}
                        selectedTasks={selectedTasks}
                        projectId={projectId}
                        taskNumber={task.taskNumber}
                        subtasks={task.subtasks}
                        taskType={task.taskType}
                      />
                    );
                  }
                })}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={tasks.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

TaskTable.propTypes = {
  className: PropTypes.string,
  tasks: PropTypes.array.isRequired,
};

// export default connect (null, {deleteTicket, toggleTicketCompleted}) (
//   TicketTable
// );

export default TaskTable;
//fix user.user

//line 137/Checkbox props: placeholder for onChange={handleChangeAll}
/**
 * <TicketItem
                      key={ticket._id}
                      id={ticket._id}
                      tasksummary={ticket.tasksummary}
                      ticketDescription={ticket.ticketDescription}
                      date={ticket.date}
                      handleSelectOne={handleSelectOne}
                      selectedtasks={selectedtasks}
                      projectId={projectId}
                      ticketNumber={ticket.ticketNumber}
                    />
 * 
 * 
 */
