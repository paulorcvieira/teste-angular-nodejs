const { List, Task, User } = require('../models');

class ListController {
  async all(request, response) {
    try {
      const lists = await List.find({
        _userId: request.user_id,
      });
  
      return response.status(200).json(lists);
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async create(request, response) {
    try {
      const newList = new List({
        title: request.body.title,
        _userId: request.user_id,
      });
      const list = await newList.save();
  
      return response.status(200).json(list);
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async update(request, response) {
    try {
      const list = await List.findOneAndUpdate(
        { _id: request.params.id, _userId: request.user_id },
        { $set: request.body },
      );
  
      return response.status(200).json(list);
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async delete(request, response) {
    try {
      const { listId } = request.params;
  
      await List.findOneAndRemove({
        _id: listId,
        _userId: request.user_id,
      });
  
      await Task.deleteMany({ _listId: listId });
  
      return response.status(204).send();
    } catch(err) {
      return response.status(400).json(err);
    };
  }
};

module.exports = new ListController();