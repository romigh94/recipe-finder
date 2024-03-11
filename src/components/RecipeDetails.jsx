// components/RecipeDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService from '../services/apiService';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await apiService.getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error('RecipeDetails - Fetch Error:', error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleFavoriteClick = async () => {
    try {
      await apiService.addRecipeToFavorites(id);
      console.log('Recipe added to favorites!');
    } catch (error) {
      console.error('Failed to add recipe to favorites:', error.message);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Cooking Instructions: {recipe.instructions}</p>
      <img src={recipe.image_url} alt={recipe.name} />
      <button onClick={handleFavoriteClick}>Add to Favorites</button>
      <Link to="/favorites">Go to Favorites</Link>
    </div>
  );
};

export default RecipeDetails;
