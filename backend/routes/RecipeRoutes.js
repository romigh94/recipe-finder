const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); 
const { Op,literal } = require('sequelize');


router.get('/recipes/search', async (req, res) => {
    try {
      const searchTerm = req.query.term;
      console.log('Search Term from Frontend:', searchTerm);
  
      const recipes = await Recipe.findAll({
        where: {
          [Op.or]: [
            literal(`name LIKE '%${searchTerm}%' COLLATE utf8mb4_general_ci`),
            literal(`ingredients LIKE '%${searchTerm}%' COLLATE utf8mb4_general_ci`),
          ],
        },
      });
  
      console.log('Retrieved recipes:', recipes);
      res.json(recipes);
    } catch (error) {
      console.error('Error searching for recipes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByPk(id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/recipes/favorite/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByPk(id);
    if (recipe) {
      res.json({ message: 'Recipe added to favorites' });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;