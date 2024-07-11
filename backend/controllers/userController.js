const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, noTelp } = req.body;

    if (!name || !email || !password || !noTelp) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, noTelp });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error in createUser:', error);
    res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, email, password, noTelp } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!name || !email || !password || !noTelp) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.update({ name, email, password: hashedPassword, noTelp });

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user', details: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user', details: error.message });
  }
};
