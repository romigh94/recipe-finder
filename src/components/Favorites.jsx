import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import apiService from '../services/apiService';

const Favorites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {

      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavoriteRecipes(storedFavorites);
    };

    fetchFavoriteRecipes();
  }, []);

  const handleFavoriteClick = async (recipeId) => {
    await apiService.addRecipeToFavorites(recipeId);
  };

  return (
    <div>
      <h2>Favorites</h2>
    </div>
  );
};

export default Favorites;