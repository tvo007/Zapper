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

//@route get api/posts/:id
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
// @desc     create a task for the project
// @access   Private
router.post (
  '/tasks/:id',
  [
    auth,
    [
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

//-----------
//change to toggleComplete
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

/**------------add ticket routes here! */

// @route    POST api/projects/tickets/:id
// @desc     create a ticket for the project
// @access   Private
router.post (
  '/tickets/:id',
  [
    auth,
    [
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
