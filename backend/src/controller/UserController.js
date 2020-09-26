const { List, Task, User } = require('../models');

class UserController {
  async create(request, response) {
    try {
      const newUser = new User(request.body);
  
      const user = await newUser.save();
  
      const refreshToken = await user.createSession();
      const accessToken = await user.generateAccessAuthToken();
  
      return response
        .header('x-refresh-token', refreshToken)
        .header('x-access-token', accessToken)
        .status(200)
        .json(user);
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async login(request, response) {
    try {
      const { email, password } = request.body;
  
      const user = await User.findByCredentials(email, password);
      const refreshToken = await user.createSession();
      const accessToken = await user.generateAccessAuthToken();
  
      return response
        .header('x-refresh-token', refreshToken)
        .header('x-access-token', accessToken)
        .json(user);
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async me(request, response) {
    try {
      const user = request.userObject;
      const accessToken = await user.generateAccessAuthToken();
  
      return response.header('x-access-token', accessToken).json({ user, accessToken });
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async all(request, response) {
    try {
      const { page = 1 } = request.query;
  
      const users = await User
        .find()
        .skip((page - 1) * 5)
        .limit(5)
        .sort({ name: 1 });
  
      return response.status(200).json(users);
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async one(request, response) {
    try {
      const user = await User.findById({ _id: request.params.user_id });
  
      if (!user) {
        return response.status(400).json({ error: 'User not found' });
      }
  
      return response.status(200).json(user);
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async search(request, response) {
    try {
      const { word } = request.query;
  
      const user = await User.find({"name": word}).sort({ "name": 1 });
  
      if (!user) {
        return response.status(400).json({ error: 'User not found' });
      }
  
      return response.status(200).json(user);
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async filter(request, response) {
    try {
      const { bigger = 18, less = 60 } = request.query;
  
      const users = await User.aggregate([
        { "$match": { age: { $gte: bigger, $lte: less } } },
        { $limit: 10 },
        { $project: {
            name: '$name',
            age: 1,
            _id: 0,
          }
        },
        { $sort: { age: 1 } }
      ]);
  
      return response.status(200).json(users);
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async update(request, response) {
    try {
      const { userId } = request.params;
  
      if (!userId === request.user_id) {
        return response.status(400).json({ error: 'You do not have permission' });
      }
  
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $set: request.body }
      );
  
      return response.status(200).json(user);
    } catch(err) {
      return response.status(400).json(err);
    };
  }

  async delete(request, response) {
    try {
      await User.findOneAndRemove({
        _id: request.params.user_id,
      });
  
      return response.status(204).send();
    } catch(err) {
      return response.status(400).json(err);
    };
  }
};

module.exports = new UserController();