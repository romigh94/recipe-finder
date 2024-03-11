const apiUrl = 'http://localhost:5000/api'; // Uppdatera URL:en beroende på var din server körs

const apiService = {
    
    async searchRecipes(term) {
        try {
          const response = await fetch(`${apiUrl}/recipes/search?term=${term}`);
          return response.json();
        } catch (error) {
          throw error;
        }
    },


  async getRecipeById(id) {
    const response = await fetch(`${apiUrl}/recipes/${id}`);
    return response.json();
  },

  async addRecipeToFavorites(id) {
    const response = await fetch(`${apiUrl}/recipes/favorite/${id}`, {
      method: 'POST',
    });
    return response.json();
  },
};

export default apiService;