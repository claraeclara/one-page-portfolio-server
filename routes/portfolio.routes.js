const express = require('express');
const router = express.Router();
const Portfolio = require('../models/portfolio.model');
const { isAuthenticated } = require('./../middleware/jwt.middleware');
const User = require('../models/user.model');

// GET /api/portfolios - Gets a list of portfolios from the same user
// router.get('/api/portfolios', async (req, res, next) => {
//   try {
//     const usersPortfolios = await Portfolio.find()
//     res.status(200).json(usersPortfolios)
//   } catch (error) {

//   }
// })

// POST /api/portfolios - Create a new portfolio for an existing user
router.post('/api/portfolios', isAuthenticated, async (req, res, next) => {
  try {
    // Get the data from the request body
    const {
      name,
      email,
      phone,
      website,
      template,
      titleOne,
      descriptionOne,
      imageOne,
      titleTwo,
      descriptionTwo,
      imageTwo,
      titleThree,
      descriptionThree,
      imageThree,
      userId,
    } = req.body;

    // Save the data in the db
    const createdPortfolio = await Portfolio.create({
      name,
      email,
      phone,
      website,
      template,
      titleOne,
      descriptionOne,
      imageOne,
      titleTwo,
      descriptionTwo,
      imageTwo,
      titleThree,
      descriptionThree,
      imageThree,
      userId,
    });

    // Update the user to which the portfolio belongs
    await User.findByIdAndUpdate(userId, {
      $push: { portfolios: createdPortfolio },
    });
    res.status(201).json(createdPortfolio);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET /api/portfolios/:portfolioId - Gets a specific portfolio
router.get(
  '/api/portfolios/:portfolioId',
  isAuthenticated,
  async (req, res, next) => {
    try {
      //Get the portfiolio id from the URL
      const { portfolioId } = req.params;

      //Make a DB query
      const onePortfolio = await Portfolio.findById(portfolioId);

      //Send the response
      res.status(200).json(onePortfolio);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// PUT /api/portfolios/:portfolioId - Updates a specifc portfolio
router.put(
  '/api/portfolios/:portfolioId',
  isAuthenticated,
  async (req, res, next) => {
    try {
      //Get the portfolio id
      const { portfolioId } = req.params;

      //Values to use for update the portfolio
      const {
        name,
        email,
        phone,
        website,
        template,
        titleOne,
        descriptionOne,
        imageOne,
        titleTwo,
        descriptionTwo,
        imageTwo,
        titleThree,
        descriptionThree,
        imageThree,
        userId,
      } = req.body;

      const updatedPortfolio = await Portfolio.findByIdAndUpdate(
        portfolioId,
        {
          name,
          email,
          phone,
          website,
          template,
          titleOne,
          descriptionOne,
          imageOne,
          titleTwo,
          descriptionTwo,
          imageTwo,
          titleThree,
          descriptionThree,
          imageThree,
          userId,
        },
        { new: true }
      );
      res.status(200).json(updatedPortfolio);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

// DELETE /api/portfolios/:portfolioId
router.delete(
  '/api/portfolios/:portfolioId',
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { portfolioId } = req.params;
      await Portfolio.findByIdAndDelete(portfolioId);
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
