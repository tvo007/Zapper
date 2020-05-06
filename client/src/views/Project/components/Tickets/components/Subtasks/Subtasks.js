import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {makeStyles} from '@material-ui/styles';
import {connect} from 'react-redux';
import {
  addTicketSubtask,
  editTicketSubtask,
  deleteTicketSubtask,
  toggleTicketSubtask,
} from '../../../../../../actions/ticket';
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
  Typography,
  TablePagination,
} from '@material-ui/core';

import SubtaskItem from '../Subtasks/components/SubtaskItem';
import SubtaskForm from '../Subtasks/components/SubtaskForm';

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

const Subtasks = props => {
  const {
    className,
    subtasks,
    projectId,
    addTicketSubtask,
    deleteTicketSubtask,
    editTicketSubtask,
    toggleTicketSubtask,
    ticketId,
    ...rest
  } = props;

  const subtaskActions = {
    addTicketSubtask,
    deleteTicketSubtask,
    editTicketSubtask,
    toggleTicketSubtask,
  };

  const classes = useStyles ();

  const [selectedItems, setSelectedItems] = useState ([]);
  const [rowsPerPage, setRowsPerPage] = useState (10);
  const [page, setPage] = useState (0);

  const handleSelectAll = event => {
    const {subtasks} = props;

    let selectedItems;

    if (event.target.checked) {
      selectedItems = subtasks.map (subtask => subtask._id);
    } else {
      selectedItems = [];
    }

    setSelectedItems (selectedItems);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedItems.indexOf (id);
    let newSelectedItems = [];

    if (selectedIndex === -1) {
      newSelectedItems = newSelectedItems.concat (selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelectedItems = newSelectedItems.concat (selectedItems.slice (1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelectedItems = newSelectedItems.concat (selectedItems.slice (0, -1));
    } else if (selectedIndex > 0) {
      newSelectedItems = newSelectedItems.concat (
        selectedItems.slice (0, selectedIndex),
        selectedItems.slice (selectedIndex + 1)
      );
    }

    setSelectedItems (newSelectedItems);
  };

  const handlePageChange = (event, page) => {
    setPage (page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage (event.target.value);
  };

  return (
    <React.Fragment>
      <SubtaskForm addTicketSubtask={subtaskActions.addTicketSubtask} projectId={projectId} ticketId={ticketId}/>
      <Card {...rest} className={clsx (classes.root, className)}>
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedItems.length === subtasks.length}
                        color="primary"
                        indeterminate={
                          selectedItems.length > 0 &&
                            selectedItems.length < subtasks.length
                        }
                      />
                    </TableCell>
                    <TableCell>Something???</TableCell>
                    <TableCell>Summary</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Subtasks</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>More Options</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subtasks
                    .slice (0, rowsPerPage)
                    .map (subtask => (
                      <SubtaskItem
                        key={subtask._id}
                        subtaskId={subtask._id}
                        subtaskSummary={subtask.subtaskSummary}
                        subtaskDescription={subtask.subtaskDescription}
                        date={subtask.date}
                        handleSelectOne={handleSelectOne}
                        selectedItems={selectedItems}
                        projectId={projectId}
                        subtaskActions = {subtaskActions}
                        isCompleted={subtask.isCompleted}
                        ticketId={ticketId}
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
            count={subtasks.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

Subtasks.propTypes = {
  className: PropTypes.string,
  subtasks: PropTypes.array.isRequired,
};

export default connect (null, {
  addTicketSubtask,
  deleteTicketSubtask,
  editTicketSubtask,
  toggleTicketSubtask,
}) (Subtasks);
