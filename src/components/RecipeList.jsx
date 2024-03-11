// components/RecipeList.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import SearchBar from './SearchRecipes';
import RecipeDetails from './RecipeDetails';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm) => {
    try {
      setLoading(true);
      const response = await apiService.searchRecipes(searchTerm);
      setRecipes(response);
    } catch (error) {
      console.error('Error searching for recipes:', error);
      setError('Error searching for recipes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch('');
  }, []);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToSearch = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Recipe App</h1>
      </div>
      <SearchBar onSearch={handleSearch} />
      {loading && <div>Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      {selectedRecipe ? (
        <div>
          <button className="back-button" onClick={handleBackToSearch}>Back to Search</button>
          {selectedRecipe.id && <RecipeDetails recipe={selectedRecipe} id={selectedRecipe.id} />}
        </div>
      ) : (
        <ul className="recipe-list">
          {Array.isArray(recipes) && recipes.length > 0 ? (
            recipes.map((recipe) => (
              <li key={recipe.id} className="recipe-item" onClick={() => handleRecipeClick(recipe)}>
                {recipe.name} - {recipe.ingredients}
              </li>
            ))
          ) : (
            <li>No recipes found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
