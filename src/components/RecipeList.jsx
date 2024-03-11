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
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {selectedRecipe ? (
        <div>
          <button onClick={handleBackToSearch}>Back to Search</button>
          <RecipeDetails recipe={selectedRecipe} />
        </div>
      ) : (
        <ul>
          {Array.isArray(recipes) && recipes.length > 0 ? (
            recipes.map((recipe) => (
              <li key={recipe.id} >
                <Link to={`/recipe/${recipe.id}`}>
                  {recipe.name} - {recipe.ingredients}
                </Link>
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
