import React, {useState} from 'react';
//import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Checkbox, TableCell, TableRow, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {
  deleteStory,
  toggleStoryCompleted,
  editStory,
} from '../../../../../../actions/story';
import StoryModal from '../StoryModal';
import moment from 'moment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles (() => ({
  root: {},
}));

const StoryItem = props => {
  const {
    storyId,
    storySummary,
    storyDescription,
    isCompleted,
    date,
    subtasks,
    handleSelectOne,
    selectedStories,
    deleteStory,
    toggleStoryCompleted,
    projectId,
    storyNumber,
    editStory,

    //...rest
  } = props;

  const [openModal, setOpenModal] = useState (false);

  //ticket: {_id, ticketDescription, name, avatar, user, date, isCompleted}

  const deleteHandler = e => deleteStory (projectId, storyId);
  const toggleHandler = e => toggleStoryCompleted (projectId, storyId);

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
      selected={selectedStories.indexOf (storyId) !== -1}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          onChange={event => handleSelectOne (event, storyId)}
          value="true"
          checked={checkboxChecked}
          onClick={toggleHandler}
        />
      </TableCell>
      <TableCell>
        <div className={classes.nameContainer}>
          <Typography variant="body1">
            {storyNumber}
          </Typography>
        </div>
      </TableCell>
      <TableCell>{storySummary}</TableCell>
      <TableCell>
        {storyDescription}
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
      <StoryModal
        handleCloseModal={handleCloseModal}
        openModal={openModal}
        storyNumber={storyNumber}
        storySummary={storySummary}
        storyDescription={storyDescription}
        date={date}
        storyId={storyId}
        projectId={projectId}
        editStory={editStory}
        subtasks={subtasks}
      />

    </TableRow>
  );
};

StoryItem.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   auth: state.auth,
// });

export default connect (null, {
  deleteStory,
  toggleStoryCompleted,
  editStory,
}) (StoryItem);

// export default TicketItem;
