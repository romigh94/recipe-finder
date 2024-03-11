//const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const Recipe = require('./models/Recipe');

const mockRecipes = [
  { name: 'Recipe 1', ingredients: 'Ingredient 1, Ingredient 2', instructions: 'Step 1, Step 2' },
  { name: 'Recipe 2', ingredients: 'Ingredient 3, Ingredient 4', instructions: 'Step 3, Step 4' },
];


const seedDatabase = async () => {
  try {
    await sequelize.sync();

    await Recipe.bulkCreate(mockRecipes);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
