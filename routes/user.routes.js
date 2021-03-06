const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { isAuthenticated } = require('./../middleware/jwt.middleware');

// GET /api/users/userId  - Get current user info
router.get('/api/users/current', isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;
    const user = await User.findById(currentUser._id).populate('portfolios');

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put('/api/users/current', isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.

    const currentUser = req.payload;

    const { name, image } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { name: name, image: image },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
