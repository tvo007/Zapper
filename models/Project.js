//model for project schema goes here
/**
 * base it off post schema???
 * 
 * what is the mechanism??
 * 
 * user creates project/desc
 * breaks project into smaller tasks
 * assign members tasks
 * 
 * tickets/bugs-members can submit
 * 
 * -----------
 * 
 * 
 * 
 * 
 * riff off of comments/posts section
 * 
 * user/creator as a lead,
 * title
 * description
 * comments => tasks
 * team members
 * 
 * 
 * 
 */

const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    //required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  tasks: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      taskDescription: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
      users: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      taskPriority: {
        type: Number,
      },
      //add more task details here
    },
  ],

  tickets: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      ticketDescription: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
      users: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      ticketPriority: {
        type: Number,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Project = mongoose.model ('project', ProjectSchema);
