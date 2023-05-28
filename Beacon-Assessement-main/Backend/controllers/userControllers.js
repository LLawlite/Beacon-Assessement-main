const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please Enter all the Fields');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({
        success: false,
        error: 'User already exists',
      });
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,

        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Failed to Create the User');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,

        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, authUser };
