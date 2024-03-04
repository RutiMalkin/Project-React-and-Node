
 const User = require('../models/users');

exports.addUser=async(req,res) => {
    console.log("user: ",req.body);
    const newUser =await User.create(req.body);
    res.json(newUser);
};

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Failed to get users:', error);
      res.status(500).json({ message: 'Failed to get users' });
    }
  };