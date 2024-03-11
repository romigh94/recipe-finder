const express = require('express');
const cors = require('cors');
const sequelize = require('./sequelize'); 
const recipeRoutes = require('./routes/RecipeRoutes'); 
const Recipe = require('./models/Recipe');
require('dotenv').config()

const app = express();

app.use(express.json());

app.use(cors());

Recipe.sync(); 

app.use('/api', recipeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
