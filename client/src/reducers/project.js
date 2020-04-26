import {
  GET_PROJECTS,
  PROJECT_ERROR,
  EDIT_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT,
  ADD_PROJECT,
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK_COMPLETED,
  ADD_TICKET,
  REMOVE_TICKET,
  TOGGLE_TICKET_COMPLETED,
  ADD_SUBTASK,
  REMOVE_SUBTASK,
  TOGGLE_SUBTASK,
  EDIT_TASK,
  EDIT_SUBTASK,
  ADD_STORY,
  REMOVE_STORY,
  EDIT_STORY,
  TOGGLE_STORY_COMPLETED,
  ADD_STORY_SUBTASK,
  EDIT_STORY_SUBTASK,
  REMOVE_STORY_SUBTASK,
  TOGGLE_STORY_SUBTASK,
  EDIT_TICKET,
} from '../actions/types';

const initialState = {
  projects: [],
  project: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload,
        loading: false,
      };
    case GET_PROJECT:
    case EDIT_PROJECT:
      return {
        ...state,
        project: payload,
        loading: false,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [payload, ...state.projects],
        loading: false,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter (project => project._id !== payload),
        loading: false,
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case TOGGLE_TASK_COMPLETED:
      return {
        ...state,
        project: {
          ...state.project,
          tasks: state.project.tasks.map (
            (task, index) =>
              task._id === payload.taskId
                ? {...task, isCompleted: payload.isCompleted[index].isCompleted}
                : task
          ),
        },
        loading: false,
      };
    case TOGGLE_SUBTASK:
      return {
        ...state,
        project: {
          ...state.project,
          tasks: state.project.tasks.map (
            (task, index) =>
              task._id === payload.taskId
                ? {
                    ...task,
                    subTasks: payload.subTasks[index].subTasks.map (
                      (subtask, index) =>
                        subtask._id === payload.subTaskId
                          ? {
                              ...subtask,
                              isCompleted: payload.isCompleted[index]
                                .isCompleted,
                            }
                          : subtask
                    ),
                  }
                : task
          ),
        },
        loading: false,
      };
    //^^subject to change
    case ADD_TASK:
    case EDIT_TASK:
    case EDIT_SUBTASK:
      return {
        ...state,
        project: {...state.project, tasks: payload},
        loading: false,
      };

    case ADD_SUBTASK:
      return {
        ...state,
        project: {
          ...state.project,
          tasks: state.project.tasks.map (
            (task, index) =>
              task._id === payload.taskId
                ? {...task, subTasks: payload.subTasks[index].subTasks}
                : task
          ),
        },
        loading: false,
      };

    case REMOVE_TASK:
      return {
        ...state,
        project: {
          ...state.project,
          tasks: state.project.tasks.filter (task => task._id !== payload),
        },
        loading: false,
      };

    case REMOVE_SUBTASK:
      return {
        ...state,
        project: {
          ...state.project,
          tasks: state.project.tasks.map (
            (task, index) =>
              task._id === payload.taskId
                ? {
                    ...task,
                    subTasks: payload.subTasks[index].subTasks.filter (
                      subtask => subtask._id !== payload
                    ),
                  }
                : task
          ),
        },
        loading: false,
      };
    //story reducers
    case ADD_STORY:
    case EDIT_STORY:
    case EDIT_STORY_SUBTASK:
      return {
        ...state,
        project: {...state.project, stories: payload},
        loading: false,
      };

    case REMOVE_STORY:
      return {
        ...state,
        project: {
          ...state.project,
          stories: state.project.stories.filter (
            story => story._id !== payload
          ),
        },
        loading: false,
      };

    case TOGGLE_STORY_COMPLETED:
      return {
        ...state,
        project: {
          ...state.project,
          stories: state.project.stories.map (
            (story, index) =>
              story._id === payload.storyId
                ? {
                    ...story,
                    isCompleted: payload.isCompleted[index].isCompleted,
                  }
                : story
          ),
        },
        loading: false,
      };

    case TOGGLE_STORY_SUBTASK:
      return {
        ...state,
        project: {
          ...state.project,
          stories: state.project.stories.map (
            (story, index) =>
              story._id === payload.storyId
                ? {
                    ...story,
                    subTasks: payload.subTasks[index].subTasks.map (
                      (subtask, index) =>
                        subtask._id === payload.subTaskId
                          ? {
                              ...subtask,
                              isCompleted: payload.isCompleted[index]
                                .isCompleted,
                            }
                          : subtask
                    ),
                  }
                : story
          ),
        },
        loading: false,
      };

    case ADD_STORY_SUBTASK:
      return {
        ...state,
        project: {
          ...state.project,
          stories: state.project.stories.map (
            (story, index) =>
              story._id === payload.storyId
                ? {...story, subTasks: payload.subTasks[index].subTasks}
                : story
          ),
        },
        loading: false,
      };

    case REMOVE_STORY_SUBTASK:
      return {
        ...state,
        project: {
          ...state.project,
          stories: state.project.stories.map (
            (story, index) =>
              story._id === payload.storyId
                ? {
                    ...story,
                    subTasks: payload.subTasks[index].subTasks.filter (
                      subtask => subtask._id !== payload
                    ),
                  }
                : story
          ),
        },
        loading: false,
      };

    case ADD_TICKET:
    case EDIT_TICKET:
      return {
        ...state,
        project: {...state.project, tickets: payload},
        loading: false,
      };

    case TOGGLE_TICKET_COMPLETED:
      return {
        ...state,
        project: {
          ...state.project,
          tickets: state.project.tickets.map (
            (ticket, index) =>
              ticket._id === payload.ticketId
                ? {
                    ...ticket,
                    isCompleted: payload.isCompleted[index].isCompleted,
                  }
                : ticket
          ),
        },
        loading: false,
      };

    case REMOVE_TICKET:
      return {
        ...state,
        project: {
          ...state.project,
          tickets: state.project.tickets.filter (
            ticket => ticket._id !== payload
          ),
        },
        loading: false,
      };

    default:
      return state;
  }
}
