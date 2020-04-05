//project routes go here!!!!
//model off of posts routes!!
//model tasks from comments

const express = require ('express');
const router = express.Router ();
const {check, validationResult} = require ('express-validator');
const auth = require ('../../middleware/auth');
const Project = require ('../../models/Project');
const Post = require ('../../models/Post');
const Profile = require ('../../models/Profile');
const User = require ('../../models/User');

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

//@route get api/projects/:id
//desc: get posts by id
//access private

router.get ('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById (req.params.id);

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

// @route  PUT api/projects/:id
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
      const {name, avatar, title, user, tasks, tickets, date} = originalProject; // all other values should remain the same
      let newProject = {
        description,
        name,
        avatar,
        user,
        title,
        tasks,
        tickets,
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

//@route delete api/projects/:id
//desc: del a project
//access private

router.delete ('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById (req.params.id);

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

// @route    POST api/projects/tasks/:id
// @desc     create/update a task for the project
// @access   Private
router.post (
  '/tasks/:id',
  [
    auth,
    [
      check ('taskSummary', 'Task summary is required').not ().isEmpty (),
      check ('taskDescription', 'Task description is required')
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
      const project = await Project.findById (req.params.id);

      const newTask = {
        taskSummary: req.body.taskSummary,
        taskDescription: req.body.taskDescription,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
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

// @route    PUT api/projects/tasks/:id
// @desc     edit a task for project
// @access   Private
// WIP advanced mongodb queries
router.put (
  '/tasks/:id/:task_id',
  [
    auth,
    [
      check ('taskSummary', 'Task summary is required').not ().isEmpty (),
      check ('taskDescription', 'Task description is required')
        .not ()
        .isEmpty (),
    ],
  ],
  async (req, res) => {
    try {
      const project = await Project.findById (req.params.id); // Pull out task
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
        subTasks,
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
        subTasks,
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

// @route    DELETE api/projects/tasks/:id/:task_id
// @desc     Delete id
// @access   Private
router.delete ('/tasks/:id/:task_id', auth, async (req, res) => {
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

//@route put api/projects/tasks/:id/:task_id/isCompleted
//desc: like a post
//access private
router.put ('/tasks/:id/:task_id/isCompleted', auth, async (req, res) => {
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

    //check if post has already been liked

    // if (
    //   post.likes.filter (like => like.user.toString () === req.user.id).length >
    //   0
    // ) {
    //   return res.status (400).json ({msg: 'Post already liked.'});
    // }

    // post.likes.unshift ({user: req.user.id});

    await project.save ();

    res.json (project.tasks);
  } catch (err) {
    console.error (err.message);
    res.status (500).send ('Server Error');
  }
});

// @route    POST api/projects/tasks/:id/:task_id
// @desc     add subtasks under tasks
// @access   Private

router.post (
  '/tasks/:id/:task_id/subTasks',
  [
    auth,
    [
      check ('subTaskSummary', 'Subtask summary is required').not ().isEmpty (),
      check ('subTaskDescription', 'Subtask description is required')
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
      const project = await Project.findById (req.params.id);
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

      const newSubTask = {
        subTaskSummary: req.body.subTaskSummary,
        subTaskDescription: req.body.subTaskDescription,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      project.tasks[addIndex].subTasks.unshift (newSubTask);

      await project.save ();

      res.json (project.tasks);
    } catch (err) {
      console.error (err.message);
      res.status (500).send ('Server Error');
    }
  }
);
// @route    PUT api/projects/tasks/:id/:task_id/:subtask_id
// @desc     edit subtask by id
// @access   Private
router.put (
  '/tasks/:id/:task_id/:subtask_id',
  [
    auth,
    [
      check ('subTaskSummary', 'Subtask summary is required').not ().isEmpty (),
      check ('subTaskDescription', 'Subtask description is required')
        .not ()
        .isEmpty (),
    ],
  ],
  async (req, res) => {
    try {
      const project = await Project.findById (req.params.id); // Pull out task
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

      const subtask = project.tasks[taskIndex].subTasks.find (
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

      const {subTaskSummary, subTaskDescription} = req.body;

      const {
        _id,
        user,
        name,
        avatar,
        date,
        isCompleted,
        users,
        taskPriority,
      } = subtask;

      let newSubTask = {
        _id,
        user,
        subTaskSummary,
        subTaskDescription,
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

      

      const editIndex = project.tasks[taskIndex].subTasks
        .map (subtask => subtask.id)
        .indexOf (req.params.subtask_id);

      project.tasks[taskIndex].subTasks.splice (editIndex, 1, newSubTask);
      await project.save ();
      res.json (project.tasks);
    } catch (err) {
      res.status (500).send ('Server Error');
    }
  }
);

// @route    DELETE api/projects/tasks/:id/:task_id/:subtask_id
// @desc     Delete subtask by id
// @access   Private
router.delete ('/tasks/:id/:task_id/:subtask_id', auth, async (req, res) => {
  try {
    const project = await Project.findById (req.params.id);

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

    const subtask = project.tasks[taskIndex].subTasks.find (
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
    const removeIndex = project.tasks[taskIndex].subTasks
      .map (subtask => subtask.id)
      .indexOf (req.params.subtask_id);

    project.tasks[taskIndex].subTasks.splice (removeIndex, 1);

    await project.save ();

    res.json (project.tasks);
  } catch (err) {
    console.error (err.message);
    res.status (500).send ('Server Error');
  }
});

//@route put api/projects/tasks/:id/:task_id/:subtask_id/isCompleted
//desc: toggle subtask for complettion
//access private
router.put (
  '/tasks/:id/:task_id/:subtask_id/isCompleted',
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

      //task.isCompleted = !task.isCompleted;
      const taskIndex = project.tasks
        .map (task => task.id)
        .indexOf (req.params.task_id);

      const subtask = project.tasks[taskIndex].subTasks.find (
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

/**------------add ticket routes here! */

// @route    POST api/projects/tickets/:id
// @desc     create a ticket for the project
// @access   Private
router.post (
  '/tickets/:id',
  [
    auth,
    [
      check ('ticketSummary', 'Ticket summary is required').not ().isEmpty (),
      check ('ticketDescription', 'Ticket description is required')
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
      const project = await Project.findById (req.params.id);

      const newTicket = {
        ticketSummary: req.body.ticketSummary,
        ticketDescription: req.body.ticketDescription,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      project.tickets.unshift (newTicket);

      await project.save ();

      res.json (project.tickets);
    } catch (err) {
      console.error (err.message);
      res.status (500).send ('Server Error');
    }
  }
);

// @route    DELETE api/projects/tickets/:id/:ticket_id
// @desc     Delete ticket
// @access   Private
router.delete ('/tickets/:id/:ticket_id', auth, async (req, res) => {
  try {
    const project = await Project.findById (req.params.id);

    // Pull out ticket
    const ticket = project.tickets.find (
      ticket => ticket.id === req.params.ticket_id
    );

    // Make sure task exists
    if (!ticket) {
      return res.status (404).json ({msg: 'Ticket does not exist'});
    }

    // Check user
    if (ticket.user.toString () !== req.user.id) {
      return res.status (401).json ({msg: 'User not authorized'});
    }

    // Get remove index
    const removeIndex = project.tickets
      .map (ticket => ticket.id)
      .indexOf (req.params.ticket_id);

    project.tickets.splice (removeIndex, 1);

    await project.save ();

    res.json (project.tickets);
  } catch (err) {
    console.error (err.message);
    res.status (500).send ('Server Error');
  }
});

//-----------
//change to toggleTicketComplete
//@route put api/projects/tickets/:id/:ticket_id/isCompleted
//desc: toggles ticket completed state
//access private
router.put ('/tickets/:id/:ticket_id/isCompleted', auth, async (req, res) => {
  try {
    const project = await Project.findById (req.params.id);

    // Pull out ticket
    const ticket = project.tickets.find (
      ticket => ticket.id === req.params.ticket_id
    );

    // Make sure ticket exists
    if (!ticket) {
      return res.status (404).json ({msg: 'Ticket does not exist'});
    }

    // Check user
    if (ticket.user.toString () !== req.user.id) {
      return res.status (401).json ({msg: 'User not authorized'});
    }

    ticket.isCompleted = !ticket.isCompleted;

    await project.save ();

    res.json (project.tickets);
  } catch (err) {
    console.error (err.message);
    res.status (500).send ('Server Error');
  }
});

module.exports = router;
