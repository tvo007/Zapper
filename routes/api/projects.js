//project routes go here!!!!
//model off of posts routes!!
//model tasks from comments

const express = require ('express');
const router = express.Router ();
const {check, validationResult} = require ('express-validator');
const auth = require ('../../middleware/auth');
const Project = require ('../../models/Project');
const User = require ('../../models/User');
const shortid = require ('shortid');

//route POST api/project
//desc: Create a project
//access private

router.post (
  '/',
  [
    auth,
    [
      check ('title', 'Text is required').not ().isEmpty (),
      check ('description', 'Description is required').not ().isEmpty (),
    ],
  ],
  async (req, res) => {
    const errors = validationResult (req);
    if (!errors.isEmpty ()) {
      return res.status (400).json ({errors: errors.array ()});
    }

    // const {title, description} = req.body;

    try {
      const user = await User.findById (req.user.id).select ('-password');

      const newProject = new Project ({
        title: req.body.title,
        description: req.body.description,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const project = await newProject.save ();

      res.json (project);
    } catch (err) {
      console.error (err.message);
      res.status (500).send ('Server Error');
    }
  }
);

//@route get api/projects
//desc: get all projects
//access private

router.get ('/', auth, async (req, res) => {
  try {
    const project = await Project.find ().sort ({date: -1});
    res.json (project);
  } catch (err) {
    console.error (err.message);
    res.status (500).send ('Server Error');
  }
});

//@route get api/projects/:project_id
//desc: get posts by id
//access private

router.get ('/:project_id', async (req, res) => {
  try {
    const project = await Project.findById (req.params.project_id);

    if (!project) {
      return res.status (404).json ({msg: 'Project not found'});
    }

    res.json (project);
  } catch (err) {
    console.error (err.message);
    if (err.kind === 'ObjectId') {
      return res.status (404).json ({msg: 'Project not found'});
    }
    res.status (500).send ('Server Error');
  }
});

// @route  PUT api/projects/:project_id
// @desc   Edit a post
// @access Private

router.put (
  '/:project_id',
  [auth, check ('description', 'Description is required').not ().isEmpty ()],
  async (req, res) => {
    const errors = validationResult (req);
    if (!errors.isEmpty ()) res.status (400).json ({errors: errors.array ()});
    // Confirm and acquirer original post
    const originalProject = await Project.findOne ({
      _id: req.params.project_id,
    });

    if (!originalProject) {
      // If post not found
      res.status (404).json ({errors: [{msg: 'Resource Not Found'}]});
    } else if (originalProject.user.toString () !== req.user.id) {
      // if incorrect user somehow attempts to access resource
      res
        .status (401)
        .json ({errors: [{msg: 'Invalid Credentials; User not authorized'}]});
    } else {
      const {description} = req.body; // only value that should change
      const {name, avatar, title, user, tasks, date} = originalProject; // all other values should remain the same
      let newProject = {
        description,
        name,
        avatar,
        user,
        title,
        tasks,
        date,
        edited: {
          // added to create updated post feature
          updated: true,
          date: Date.now (),
        },
      };

      try {
        // find and update resource and ensure id remains the same
        const project = await Project.findOneAndUpdate (
          {_id: req.params.project_id},
          {$set: {_id: req.params.project_id, ...newProject}},
          {new: true}
        );
        res.status (200).json (project);
      } catch (err) {
        console.error (err.message);
        res.status (500).json ({errors: [{msg: 'Server Error'}]});
      }
    }
  }
);

//@route delete api/projects/:project_id
//desc: del a project
//access private

router.delete ('/:project_id', auth, async (req, res) => {
  try {
    const project = await Project.findById (req.params.project_id);

    if (!project) {
      return res.status (404).json ({msg: 'Project not found'});
    }
    //check user
    if (project.user.toString () !== req.user.id) {
      return res.status (401).json ({msg: 'User not authorized.'});
    }
    await project.remove ();
    res.json ({msg: 'Project removed.'});
  } catch (err) {
    console.error (err.message);
    if (err.kind === 'ObjectId') {
      return res.status (404).json ({msg: 'Project not found'});
    }
    res.status (500).send ('Server Error');
  }
});

// @route    get api/projects/project_id/tasks
// @desc     get tasks for project
// @access   Private

router.get ('/:project_id/tasks', auth, async (req, res) => {
  try {
    const project = await Project.findById (req.params.project_id);

    if (!project) {
      return res.status (404).json ({msg: 'Project not found'});
    }

    res.json (project.tasks);
  } catch (err) {
    console.error (err.message);
    if (err.kind === 'ObjectId') {
      return res.status (404).json ({msg: 'Project not found'});
    }
    res.status (500).send ('Server Error');
  }
});

//get task by id
router.get ('/:project_id/tasks/:task_id', auth, async (req, res) => {
  try {
    const project = await Project.findById (req.params.project_id);

    // Pull out task
    const task = project.tasks.find (task => task.id === req.params.task_id);

    // Make sure task exists
    if (!task) {
      return res.status (404).json ({msg: 'Task does not exist'});
    }

    // Check user
    if (task.user.toString () !== req.user.id) {
      return res.status (401).json ({msg: 'User not authorized'});
    }

    res.json (task);
  } catch (err) {
    console.error (err.message);
    res.status (500).send ('Server Error');
  }
});

// @route    POST api/projects/:project_id/tasks
//actual route: api/projects/:project_id/tasks
// @desc     create/update a task for the project
// @access   Private
router.post (
  '/:project_id/tasks',
  [
    auth,
    [
      check ('taskSummary', 'Task summary is required').not ().isEmpty (),
      check ('taskDescription', 'Task description is required')
        .not ()
        .isEmpty (),
      check ('taskType', 'Task type is required.').not ().isEmpty (),
    ],
  ],
  async (req, res) => {
    const errors = validationResult (req);
    if (!errors.isEmpty ()) {
      return res.status (400).json ({errors: errors.array ()});
    }

    try {
      const user = await User.findById (req.user.id).select ('-password');
      const project = await Project.findById (req.params.project_id);

      //check if correct project
      if (!project) {
        return res.status (404).json ({msg: 'Project not found'});
      }
      //check user
      if (project.user.toString () !== req.user.id) {
        return res.status (401).json ({msg: 'User not authorized.'});
      }

      const addToId = taskType => {
        if (taskType === 'Task') {
          return 'TS' + shortid.generate ();
        } else if (taskType === 'Story') {
          return 'ST' + shortid.generate ();
        } else if (taskType === 'Ticket') {
          return 'TX' + shortid.generate ();
        }
      };

      const newTask = {
        taskSummary: req.body.taskSummary,
        taskDescription: req.body.taskDescription,
        taskType: req.body.taskType,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        taskNumber: addToId (req.body.taskType),
      };

      project.tasks.unshift (newTask);

      await project.save ();

      res.json (project.tasks);
    } catch (err) {
      console.error (err.message);
      res.status (500).send ('Server Error');
    }
  }
);

// @route    PUT api/projects/:project_id/tasks/:task_id'
// @desc     edit a task for project
// @access   Private
router.put (
  '/:project_id/tasks/:task_id',
  [
    auth,
    [
      check ('taskSummary', 'Task summary is required').not ().isEmpty (),
      check ('taskDescription', 'Task description is required')
        .not ()
        .isEmpty (),
      check ('taskType', 'Task type is required').not ().isEmpty (),
    ],
  ],
  async (req, res) => {
    try {
      const project = await Project.findById (req.params.project_id); // Pull out task
      const task = project.tasks.find (task => task.id === req.params.task_id); // Make sure task exists
      if (!task) {
        return res.status (404).json ({msg: 'Task does not exist'});
      } // Check user
      if (task.user.toString () !== req.user.id) {
        return res.status (401).json ({msg: 'User not authorized'});
      }
      const {taskSummary, taskDescription} = req.body;
      const {
        _id,
        user,
        name,
        avatar,
        date,
        isCompleted,
        users,
        taskPriority,
        subtasks,
        taskType,
        taskNumber,
      } = task;
      let newTask = {
        _id,
        user,
        taskSummary,
        taskDescription,
        name,
        avatar,
        date,
        isCompleted,
        users,
        taskPriority,
        subtasks,
        taskType,
        taskNumber,
        edited: {
          updated: true,
          date: Date.now (),
        },
      }; // Get remove index
      const editIndex = project.tasks
        .map (task => task.id)
        .indexOf (req.params.task_id);
      project.tasks.splice (editIndex, 1, newTask);
      await project.save ();
      res.json (project.tasks);
    } catch (err) {
      res.status (500).send ('Server Error');
    }
  }
);

// @route    DELETE api/projects/:project_id/tasks/:task_id'
// @desc     Delete id
// @access   Private
router.delete ('/:project_id/tasks/:task_id', auth, async (req, res) => {
  try {
    const project = await Project.findById (req.params.project_id);

    // Pull out task
    const task = project.tasks.find (task => task.id === req.params.task_id);

    // Make sure task exists
    if (!task) {
      return res.status (404).json ({msg: 'Task does not exist'});
    }

    // Check user
    if (task.user.toString () !== req.user.id) {
      return res.status (401).json ({msg: 'User not authorized'});
    }

    // Get remove index
    const removeIndex = project.tasks
      .map (task => task.id)
      .indexOf (req.params.task_id);

    project.tasks.splice (removeIndex, 1);

    await project.save ();

    res.json (project.tasks);
  } catch (err) {
    console.error (err.message);
    res.status (500).send ('Server Error');
  }
});

//@route put api/projects/:project_id/tasks/:task_id/isCompleted
//desc: like a post
//access private
router.put (
  '/:project_id/tasks/:task_id/isCompleted',
  auth,
  async (req, res) => {
    try {
      const project = await Project.findById (req.params.id);

      // Pull out task
      const task = project.tasks.find (task => task.id === req.params.task_id);

      // Make sure task exists
      if (!task) {
        return res.status (404).json ({msg: 'Task does not exist'});
      }

      // Check user
      if (task.user.toString () !== req.user.id) {
        return res.status (401).json ({msg: 'User not authorized'});
      }

      task.isCompleted = !task.isCompleted;

      await project.save ();

      res.json (project.tasks);
    } catch (err) {
      console.error (err.message);
      res.status (500).send ('Server Error');
    }
  }
);

// @route    get api/projects/:project_id/tasks/:task_id/subtasks
// @desc     get subtasks under by task id
// @access   Private

router.get (
  '/:project_id/tasks/:task_id/subtasks',
  [auth],
  async (req, res) => {
    const errors = validationResult (req);
    if (!errors.isEmpty ()) {
      return res.status (400).json ({errors: errors.array ()});
    }

    try {
      const user = await User.findById (req.user.id).select ('-password');
      const project = await Project.findById (req.params.project_id);
      // Pull out task
      const task = project.tasks.find (task => task.id === req.params.task_id);

      if (!task) {
        return res.status (404).json ({msg: 'Task does not exist'});
      }

      //Check user
      if (task.user.toString () !== req.user.id) {
        return res.status (401).json ({msg: 'User not authorized'});
      }

      const taskIndex = project.tasks
        .map (task => task.id)
        .indexOf (req.params.task_id);

      res.json (project.tasks[taskIndex].subtasks);
    } catch (err) {
      console.error (err.message);
      res.status (500).send ('Server Error');
    }
  }
);

router.get (
  '/:project_id/tasks/:task_id/subtasks/:subtask_id',
  [auth],
  async (req, res) => {
    const errors = validationResult (req);
    if (!errors.isEmpty ()) {
      return res.status (400).json ({errors: errors.array ()});
    }

    try {
      const user = await User.findById (req.user.id).select ('-password');
      const project = await Project.findById (req.params.project_id);
      // Pull out task
      const task = project.tasks.find (task => task.id === req.params.task_id);

      const subtask = task.subtasks.find (
        subtask => subtask.id === req.params.subtask_id
      );

      if (!task) {
        return res.status (404).json ({msg: 'Task does not exist'});
      }

      // Check user
      if (task.user.toString () !== req.user.id) {
        return res.status (401).json ({msg: 'User not authorized'});
      }

      const subtaskIndex = task.subtasks
        .map (subtask => subtask.id)
        .indexOf (req.params.subtask_id);

      res.json (task.subtasks[subtaskIndex]);
    } catch (err) {
      console.error (err.message);
      res.status (500).send ('Server Error');
    }
  }
);

// @route    POST api/projects/:project_id/tasks/:task_id/subtasks
// @desc     add subtasks under tasks
// @access   Private

router.post (
  '/:project_id/tasks/:task_id/subtasks',
  [
    auth,
    [
      check ('subtaskSummary', 'Subtask summary is required').not ().isEmpty (),
      check ('subtaskDescription', 'Subtask description is required')
        .not ()
        .isEmpty (),
    ],
  ],
  async (req, res) => {
    const errors = validationResult (req);
    if (!errors.isEmpty ()) {
      return res.status (400).json ({errors: errors.array ()});
    }

    try {
      const user = await User.findById (req.user.id).select ('-password');
      const project = await Project.findById (req.params.project_id);
      // Pull out task
      const task = project.tasks.find (task => task.id === req.params.task_id);

      if (!task) {
        return res.status (404).json ({msg: 'Task does not exist'});
      }

      // Check user
      if (task.user.toString () !== req.user.id) {
        return res.status (401).json ({msg: 'User not authorized'});
      }

      const addIndex = project.tasks
        .map (task => task.id)
        .indexOf (req.params.task_id);

      const newSubtask = {
        subtaskSummary: req.body.subtaskSummary,
        subtaskDescription: req.body.subtaskDescription,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      project.tasks[addIndex].subtasks.unshift (newSubtask);

      await project.save ();

      res.json (project.tasks);
    } catch (err) {
      console.error (err.message);
      res.status (500).send ('Server Error');
    }
  }
);

// @route    PUT api/projects/project_id/tasks/task_id/subtasks/subtask_id
// @desc     edit subtask by id
// @access   Private
router.put (
  '/:project_id/tasks/:task_id/subtasks/:subtask_id',
  [
    auth,
    [
      // check ('subtaskSummary', 'Subtask summary is required').not ().isEmpty (),
      // check ('subtaskDescription', 'Subtask description is required')
      //   .not ()
      //   .isEmpty (),
    ],
  ],
  async (req, res) => {
    try {
      const project = await Project.findById (req.params.project_id); // Pull out task
      const task = project.tasks.find (task => task.id === req.params.task_id); // Make sure task exists
      if (!task) {
        return res.status (404).json ({msg: 'Task does not exist'});
      } // Check user
      if (task.user.toString () !== req.user.id) {
        return res.status (401).json ({msg: 'User not authorized'});
      }

      const taskIndex = project.tasks
        .map (task => task.id)
        .indexOf (req.params.task_id);

      const subtask = project.tasks[taskIndex].subtasks.find (
        subtask => subtask.id === req.params.subtask_id
      );

      // Make sure subtask exists
      if (!subtask) {
        return res.status (404).json ({msg: 'Subtask does not exist'});
      }

      // Check user
      if (subtask.user.toString () !== req.user.id) {
        return res.status (401).json ({msg: 'User not authorized'});
      }

      // const {subtaskSummary, subtaskDescription} = req.body;

      const {
        _id,
        user,
        subtaskSummary,
        subtaskDescription,
        name,
        avatar,
        date,
        isCompleted,
        users,
        taskPriority,
      } = subtask;

      let newSubtask = {
        _id,
        user,
        subtaskSummary: req.body.subtaskSummary === ''
          ? subtaskSummary
          : req.body.subtaskSummary,
        subtaskDescription: req.body.subtaskDescription === ''
          ? subtaskDescription
          : req.body.subtaskDescription,
        name,
        avatar,
        date,
        isCompleted,
        users,
        taskPriority,
        edited: {
          updated: true,
          date: Date.now (),
        },
      };

      const editIndex = project.tasks[taskIndex].subtasks
        .map (subtask => subtask.id)
        .indexOf (req.params.subtask_id);

      project.tasks[taskIndex].subtasks.splice (editIndex, 1, newSubtask);
      await project.save ();
      res.json (project.tasks);
    } catch (err) {
      res.status (500).send ('Server Error');
    }
  }
);

// @route    DELETE api/projects/:project_id/tasks/:task_id/subtasks/:subtask_id
// @desc     Delete subtask by id
// @access   Private
router.delete (
  '/:project_id/tasks/:task_id/subtasks/:subtask_id',
  auth,
  async (req, res) => {
    try {
      const project = await Project.findById (req.params.project_id);

      const task = project.tasks.find (task => task.id === req.params.task_id);

      // Make sure task exists
      if (!task) {
        return res.status (404).json ({msg: 'Task does not exist'});
      }

      // Check user
      if (task.user.toString () !== req.user.id) {
        return res.status (401).json ({msg: 'User not authorized'});
      }

      const taskIndex = project.tasks
        .map (task => task.id)
        .indexOf (req.params.task_id);

      const subtask = project.tasks[taskIndex].subtasks.find (
        subtask => subtask.id === req.params.subtask_id
      );

      // Make sure subtask exists
      if (!subtask) {
        return res.status (404).json ({msg: 'Subtask does not exist'});
      }

      // Check user
      if (subtask.user.toString () !== req.user.id) {
        return res.status (401).json ({msg: 'User not authorized'});
      }

      // Get remove index
      const removeIndex = project.tasks[taskIndex].subtasks
        .map (subtask => subtask.id)
        .indexOf (req.params.subtask_id);

      project.tasks[taskIndex].subtasks.splice (removeIndex, 1);

      await project.save ();

      res.json (project.tasks);
    } catch (err) {
      console.error (err.message);
      res.status (500).send ('Server Error');
    }
  }
);

//@route put api/projects/:project_id/tasks/:task_id/subtasks/:subtask_id/isCompleted'
//desc: toggle subtask for complettion
//access private
router.put (
  '/:project_id/tasks/:task_id/subtasks/:subtask_id/isCompleted',
  auth,
  async (req, res) => {
    try {
      const project = await Project.findById (req.params.project_id);

      // Pull out task
      const task = project.tasks.find (task => task.id === req.params.task_id);

      // Make sure task exists
      if (!task) {
        return res.status (404).json ({msg: 'Task does not exist'});
      }

      // Check user
      if (task.user.toString () !== req.user.id) {
        return res.status (401).json ({msg: 'User not authorized'});
      }

      //task.isCompleted = !task.isCompleted;
      const taskIndex = project.tasks
        .map (task => task.id)
        .indexOf (req.params.task_id);

      const subtask = project.tasks[taskIndex].subtasks.find (
        subtask => subtask.id === req.params.subtask_id
      );

      // Make sure subtask exists
      if (!subtask) {
        return res.status (404).json ({msg: 'Subtask does not exist'});
      }

      // Check user
      if (subtask.user.toString () !== req.user.id) {
        return res.status (401).json ({msg: 'User not authorized'});
      }

      subtask.isCompleted = !subtask.isCompleted;

      await project.save ();

      res.json (project.tasks);
    } catch (err) {
      console.error (err.message);
      res.status (500).send ('Server Error');
    }
  }
);

module.exports = router;
