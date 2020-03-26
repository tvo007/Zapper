import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  //CardHeader,
  TextField,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import {connect} from 'react-redux';
//import {deleteTask, toggleTaskCompleted} from '../../../../actions/project';
// import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const useStyles = makeStyles (() => ({
  root: {},
}));

const SubTaskItem = props => {
  const {
    className,
    subtask: {subTaskSummary, subTaskDescription, isCompleted},
    auth,
    // deleteTask,
    // toggleTaskCompleted
  } = props;

  //subtask: {_id, taskDescription, name, avatar, user, date, isCompleted}

  const classes = useStyles ();

//   const toggleHandler = e => toggleTaskCompleted (projectId, _id);
//   const deleteHandler = e => deleteTask (projectId, _id);

  const taskCompletedStyling = {
    textDecoration: isCompleted ? 'line-through' : null,
  };

//   const [taskEditToggle, setTaskEditToggle] = useState (false);
  // const [taskItemData, setTaskItemData] = useState (taskDescription);

//   const handleTaskEditToggle = () => {
//     setTaskEditToggle (!taskEditToggle);
//   };

  return (
    
        <div>
            <Typography style={taskCompletedStyling}>
              {' '}{subTaskSummary}
            </Typography>
            <Typography style={taskCompletedStyling}>
              {' '}{subTaskDescription}
            </Typography>
            {/*<CardActions>
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={toggleHandler}
              >
                <AssignmentTurnedInIcon />
              </Button>
              <Button color="primary" variant="contained" type="button">
                <EditOutlinedIcon />
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={deleteHandler}
              >
                <DeleteForeverIcon />
              </Button>
            </CardActions>*/}
    </div>
  );
};

SubTaskItem.propTypes = {
  className: PropTypes.string,
  //projectId: PropTypes.string.isRequired,
  subtask: PropTypes.object.isRequired,
  // auth: PropTypes.object.isRequired,
//   deleteTask: PropTypes.func.isRequired,
//   toggleTaskCompleted: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

export default connect () (SubTaskItem);

// export default connect (null, {deleteTask, toggleTaskCompleted}) (TaskItem);