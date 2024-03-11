const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Recipe = sequelize.define('Recipe', {
  // Använd de fält som du har i din Recipe-tabell
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'Recipe', // Använd exakt samma namn som din befintliga tabell
  timestamps: true, // This option will add createdAt and updatedAt columns

});

module.exports = Recipe;