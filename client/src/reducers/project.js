import {
  GET_PROJECTS,
  PROJECT_ERROR,
  EDIT_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT,
  ADD_PROJECT,
  GET_TASKS,
  GET_TASK,
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK_COMPLETED,
  ADD_SUBTASK,
  REMOVE_SUBTASK,
  TOGGLE_SUBTASK,
  EDIT_TASK,
  EDIT_SUBTASK,
} from '../actions/types';

const initialState = {
  projects: [],
  project: null,
  // task: null,
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
    //task redux


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
                    subtasks: payload.subtasks[index].subtasks.map (
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
    // case GET_TASKS:
    //   return {
    //     ...state,
    //     tasks: payload,
    //     loading: false,
    //   };
    // case GET_TASK:
    //   return {
    //     ...state,
    //     task: payload,
    //     loading: false,
    //   };
    //new stuff ^^^
    case ADD_TASK:
    // return {
    //   ...state,
    //   project: {...state.project, tasks: payload},
    //   loading: false,
    // };
    case EDIT_TASK:
      return {
        ...state,
        project: {...state.project, tasks: payload},
        loading: false,
      };
    case EDIT_SUBTASK:
    case ADD_SUBTASK:
      return {
        ...state,
        project: {
          ...state.project,
          tasks: state.project.tasks.map (
            (task, index) =>
              task._id === payload.taskId
                ? {...task, subtasks: payload.subtasks[index].subtasks}
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
                    subtasks: payload.subtasks[index].subtasks.filter (
                      subtask => subtask._id !== payload
                    ),
                  }
                : task
          ),
        },
        loading: false,
      };

    default:
      return state;
  }
}
