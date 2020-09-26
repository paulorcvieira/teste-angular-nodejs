const { List, Task, User } = require('../models');

class TaskController {

  async all(request, response) {

    try {
      const tasks = await Task.find({
        _listId: request.params.listId,
        _userId: request.user_id,
      });
  
      return response.status(200).send(tasks);
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async user(request, response) {
    try {
      const task = await Task.find({
        _userId: request.user_id,
      });
  
      return response.status(200).json(task);
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async one(request, response) {
    try {
      const task = await Task.findById({
        _id: request.params.taskId,
        _userId: request.user_id,
      });
  
      return response.status(200).json(task);
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async create(request, response) {
    try {
      const list = await List.findOne({
        _id: request.params.listId,
        _userId: request.user_id,
      });
  
      if (list) {
        const newTask = new Task({
          title: request.body.title,
          _listId: request.params.listId,
          _userId: request.user_id,
        });
  
        const task = await newTask.save();
  
        return response.status(200).json(task);
      }
  
      return;
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async update(request, response) {
    try {
      const { taskId, listId } = request.params;
  
      const list = await List.findOne({
        _id: listId,
        _userId: request.user_id,
      });
  
      if (list) {
        const task = await Task.findOneAndUpdate(
          { _id: taskId, _listId: listId },
          { $set: request.body },
        );
  
        return response.status(200).json(task);
      }
  
      return response.status(400).json({ error: 'List not found or permission is missing' });
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async delete(request, response) {
    try {
      const { listId } = request.params;
  
      const list = await List.findOne({
        _id: listId,
        _userId: request.user_id,
      });
  
      if (list) {
        await Task.findOneAndRemove({
          _id: request.params.taskId,
          _listId: listId,
        });
  
        return response.status(204).send();
      }
  
      return response.status(400).json({ error: 'List not found or permission is missing' });
    } catch(err) {
      return response.status(403).json(err);
    };
  }
};

module.exports = new TaskController();