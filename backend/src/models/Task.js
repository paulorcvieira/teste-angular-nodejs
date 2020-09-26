const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task };