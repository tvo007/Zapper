import axios from 'axios';
import {setAlert} from './alert';
import {
  PROJECT_ERROR,
  ADD_STORY,
  REMOVE_STORY,
  TOGGLE_STORY_COMPLETED,
  EDIT_STORY,
  ADD_STORY_SUBTASK,
  REMOVE_STORY_SUBTASK,
  TOGGLE_STORY_SUBTASK,
  EDIT_STORY_SUBTASK,
} from './types';

//add story
export const addStory = (projectId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post (
      `/api/projects/stories/${projectId}`,
      formData,
      config
    );

    dispatch ({
      type: ADD_STORY,
      payload: res.data,
    });

    dispatch (setAlert ('Story Added', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//edit story
export const editStory = (projectId, storyId, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put (
      `/api/projects/stories/${projectId}/${storyId}`,
      formData,
      config
    );

    dispatch ({
      type: EDIT_STORY,
      payload: res.data,
    });

    dispatch (setAlert ('Story details changed!', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//delete story
export const deleteStory = (projectId, storyId) => async dispatch => {
  try {
    // const res =

    await axios.delete (`/api/projects/stories/${projectId}/${storyId}`);

    dispatch ({
      type: REMOVE_STORY,
      payload: storyId,
    });

    dispatch (setAlert ('Task Removed', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//toggle story
export const toggleStoryCompleted = (projectId, storyId) => async dispatch => {
  try {
    const res = await axios.put (
      `/api/projects/stories/${projectId}/${storyId}/isCompleted`
    );

    dispatch ({
      type: TOGGLE_STORY_COMPLETED,
      payload: {storyId, isCompleted: res.data},
    });

    //res.data returns project.tasks array

    dispatch (setAlert ('Story status has changed!', 'success'));
  } catch (err) {
    console.log (err);
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//story subtasks

//add story subtask
export const addStorySubtask = (
  projectId,
  storyId,
  formData
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post (
      `/api/projects/stories/${projectId}/${storyId}/subTasks`,
      formData,
      config
    );

    dispatch ({
      type: ADD_STORY_SUBTASK,
      payload: {storyId, subTasks: res.data},
    });

    dispatch (setAlert ('Sub task Added', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//edit story subtask
export const editStorySubtask = (
  projectId,
  storyId,
  subTaskId,
  formData
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put (
      `/api/projects/stories/${projectId}/${storyId}/${subTaskId}`,
      formData,
      config
    );

    dispatch ({
      type: EDIT_STORY_SUBTASK,
      payload: res.data,
    });

    dispatch (setAlert ('Subtask details changed!', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//delete story subtask
export const deleteStorySubtask = (
  projectId,
  storyId,
  subTaskId
) => async dispatch => {
  try {
    // const res =

    const res = await axios.delete (
      `/api/projects/stories/${projectId}/${storyId}/${subTaskId}`
    );

    dispatch ({
      type: REMOVE_STORY_SUBTASK,
      payload: {storyId, subTasks: res.data},
    });

    dispatch (setAlert ('Subtask Removed', 'success'));
  } catch (err) {
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

//toggle story subtask
export const toggleStorySubtask = (
  projectId,
  storyId,
  subTaskId
) => async dispatch => {
  try {
    const res = await axios.put (
      `/api/projects/stories/${projectId}/${storyId}/${subTaskId}/isCompleted`
    );

    dispatch ({
      type: TOGGLE_STORY_SUBTASK,
      payload: {storyId, subTasks: res.data},
    });

    //res.data returns project.tasks array

    dispatch (setAlert ('Subtask status has changed!', 'success'));
  } catch (err) {
    console.log (err);
    dispatch ({
      type: PROJECT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};
