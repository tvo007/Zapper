import React, {useState} from 'react';
//import clsx from 'clsx';
import PropTypes from 'prop-types';
//import {makeStyles} from '@material-ui/styles';
import {
  Button,
  Grid,
  Checkbox,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';
import EditForm from './EditForm';
//import moment from 'moment';
// import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

// const useStyles = makeStyles (() => ({
//   root: {},
// }));

const SubtaskItem = props => {
  const {
    subtaskId,
    taskId,
    subtaskSummary,
    subtaskDescription,
    isCompleted,
    //date,
    projectId,
    subtaskActions: {
      deleteSubtask,
      toggleSubtask,
      editSubtask,
    },
    //...rest
  } = props;

  //const classes = useStyles ();

  const [editToggle, setEditToggle] = useState (false);

  const editToggleHandler = () => {
    setEditToggle (!editToggle);
  };

  const toggleHandler = e =>
    toggleSubtask (projectId, taskId, subtaskId); //create custom hook??
  const deleteHandler = e =>
    deleteSubtask (projectId, taskId, subtaskId);

  const checkboxChecked = isCompleted ? true : false;

  return (
    <React.Fragment>
      <ListItem key={subtaskId}>
        <ListItemIcon>
          <Checkbox onClick={toggleHandler} checked={checkboxChecked} />
        </ListItemIcon>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="stretch"
        >

          {editToggle
            ? <EditForm
                projectId={projectId}
                subtaskId={subtaskId}
                taskId={taskId}
                subtaskSummary={subtaskSummary}
                subtaskDescription={subtaskDescription}
                editSubtask={editSubtask}
                editToggleHandler={editToggleHandler}

              />
            : <div>
                <ListItemText>
                  <Typography variant="h6">
                    Summary: {subtaskSummary}
                  </Typography>
                </ListItemText>

                <ListItemText>
                  <Typography>
                    Desc: {subtaskDescription}
                  </Typography>
                </ListItemText>
              
          <Grid
            container
            alignItems="flex-start"
            justify="flex-end"
            direction="row"
          >
            <Button variant="contained" onClick={editToggleHandler}>
              <EditIcon />
            </Button>
            <Button variant="contained" onClick={deleteHandler}>
              <DeleteIcon />
            </Button>

          </Grid>
          </div>
          }

        </Grid>

      </ListItem>
      <Divider variant="middle" component="li" />
    </React.Fragment>
  );
};

SubtaskItem.propTypes = {
  className: PropTypes.string,
};

export default SubtaskItem;
