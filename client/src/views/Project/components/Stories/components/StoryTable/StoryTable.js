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
} from '@material-ui/core';
import StoryItem from '../StoryItem';
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
//tasks: {ticket: user, storySummary, ticketDescription, name, avatar, date, isCompleted, users, ticketPriority }
const StoryTable = props => {
  const {
    className,
    stories,
    projectId,
    // tasks: {
    //   ticket: _id,
    //   user,
    //   storySummary,
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

  const [selectedStories, setSelectedStories] = useState ([]);
  const [rowsPerPage, setRowsPerPage] = useState (10);
  const [page, setPage] = useState (0);

  // const handleSelectAll = event => {
  //   const {tasks} = props;

  //   let selectedStories;

  //   if (event.target.checked) {
  //     selectedStories = tasks.map (ticket => ticket._id);
  //   } else {
  //     selectedStories = [];
  //   }

  //   setSelectedStories (selectedStories);
  // };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedStories.indexOf (id);
    let newselectedStories = [];

    if (selectedIndex === -1) {
      newselectedStories = newselectedStories.concat (selectedStories, id);
    } else if (selectedIndex === 0) {
      newselectedStories = newselectedStories.concat (
        selectedStories.slice (1)
      );
    } else if (selectedIndex === selectedStories.length - 1) {
      newselectedStories = newselectedStories.concat (
        selectedStories.slice (0, -1)
      );
    } else if (selectedIndex > 0) {
      newselectedStories = newselectedStories.concat (
        selectedStories.slice (0, selectedIndex),
        selectedStories.slice (selectedIndex + 1)
      );
    }

    setSelectedStories (newselectedStories);
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
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedStories.length === stories.length}
                      color="primary"
                      indeterminate={
                        selectedStories.length > 0 &&
                          selectedStories.length < stories.length
                      }
                    />
                  </TableCell>
                  <TableCell>Story ID</TableCell>
                  <TableCell>Summary</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Subtasks</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>More Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stories
                  .slice (0, rowsPerPage)
                  .map (story => (
                    <StoryItem
                      key={story._id}
                      storyId={story._id}
                      storySummary={story.storySummary}
                      storyDescription={story.storyDescription}
                      isCompleted={story.isCompleted}
                      date={story.date}
                      handleSelectOne={handleSelectOne}
                      selectedStories={selectedStories}
                      projectId={projectId}
                      storyNumber={story.storyNumber}
                      subtasks={story.subtasks}
                    />
                  ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={stories.length}
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

StoryTable.propTypes = {
  className: PropTypes.string,
  stories: PropTypes.array.isRequired,
};

// export default connect (null, {deleteTicket, toggleTicketCompleted}) (
//   TicketTable
// );

export default StoryTable;
//fix user.user

//line 137/Checkbox props: placeholder for onChange={handleChangeAll}
/**
 * <TicketItem
                      key={ticket._id}
                      id={ticket._id}
                      storySummary={ticket.storySummary}
                      ticketDescription={ticket.ticketDescription}
                      date={ticket.date}
                      handleSelectOne={handleSelectOne}
                      selectedStories={selectedStories}
                      projectId={projectId}
                      ticketNumber={ticket.ticketNumber}
                    />
 * 
 * 
 */
