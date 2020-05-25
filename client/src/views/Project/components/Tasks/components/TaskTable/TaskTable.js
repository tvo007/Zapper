import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {AppBar, Tabs, Tab, Grid} from '@material-ui/core';

import TableTemplate from '../../../../../../components/Tables/TableTemplate';
import TaskItem from '../TaskItem';

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

const TaskTable = props => {
  const {className, tasks, projectId} = props;

  const classes = useStyles ();

  const [selectedTasks, setSelectedTasks] = useState ([]);

  // const [showTasks, setShowTasks] = useState (false);
  // const [showStories, setShowStories] = useState (false);
  // const [showTickets, setShowTickets] = useState (false);

  const [value, setValue] = React.useState (0); //mui tab state

  const handleChange = (event, newValue) => {
    setValue (newValue);
  };

  const [rowsPerPage, setRowsPerPage] = useState (10);
  const [page, setPage] = useState (0);

  const taskView = 'Task';

  const storyView = 'Story';

  const ticketView = 'Ticket';

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

  const displayTasks = viewType =>
    tasks.slice (0, rowsPerPage).map (task => {
      if (task.taskType === viewType) {
        return (
          <TaskItem
            key={task._id}
            taskId={task._id}
            shortId={task.taskNumber}
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
      return null;
    });

  return (
    <React.Fragment>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Tasks" />
          <Tab label="Stories" />
          <Tab label="Tickets" />
        </Tabs>
      </AppBar>
      <Grid>
        {value === 0
          ? <TableTemplate
              taskType="Task"
              selectedItems={selectedTasks}
              items={tasks}
              handlePageChange={handlePageChange}
              handleRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              classes={classes}
              className={className}
            >
              {displayTasks (taskView)}
            </TableTemplate>
          : null}
      </Grid>
      <Grid>
        {value === 1
          ? <TableTemplate
              taskType="Story"
              selectedItems={selectedTasks}
              items={tasks}
              handlePageChange={handlePageChange}
              handleRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              classes={classes}
              className={className}
            >
              {displayTasks (storyView)}
            </TableTemplate>
          : null}
      </Grid>
      <Grid>
        {value === 2
          ? <TableTemplate
              taskType="Ticket"
              selectedItems={selectedTasks}
              items={tasks}
              handlePageChange={handlePageChange}
              handleRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              classes={classes}
              className={className}
            >
              {displayTasks (ticketView)}
            </TableTemplate>
          : null}
      </Grid>
    </React.Fragment>
  );
};

TaskTable.propTypes = {
  className: PropTypes.string,
  tasks: PropTypes.array.isRequired,
};

export default TaskTable;
//fix user.user

//line 137/Checkbox props: placeholder for onChange={handleChangeAll}
/**
 * 
 * 
 * const handleSelectAll = event => {
    const {tasks} = props;

    let selectedtasks;

    if (event.target.checked) {
      selectedtasks = tasks.map (ticket => ticket._id);
    } else {
      selectedtasks = [];
    }

    setSelectedtasks (selectedtasks);
  };
 * 
 * 
 * const [taskFilter, setTaskFilter] = useState (false);
  const [storyFilter, setStoryFilter] = useState (false);
  const [ticketFilter, setTicketFilter] = useState (false);

  const taskView = taskFilter ? 'Task' : null;

  const storyView = storyFilter ? 'Story' : null;

  const ticketView = ticketFilter ? 'Ticket' : null;

  const taskFilterHandle = () => {
    setTaskFilter (!taskFilter);
  };

  const storyFilterHandle = () => {
    setStoryFilter (!storyFilter);
  };
  const ticketFilterHandle = () => {
    setTicketFilter (!ticketFilter);
  };

 *

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
                {displayTasks (taskView)}
                {displayTasks (storyView)}
                {displayTasks (ticketView)}
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




 * 
 */
