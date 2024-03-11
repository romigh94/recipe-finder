import React, { useState } from 'react';
import apiService from '../services/apiService';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = async () => {
    try {
      const recipes = await apiService.searchRecipes(searchTerm);
      onSearch(searchTerm);  // <-- Pass only the search term
    } catch (error) {
      console.error('Error searching for recipes:', error.message);
    }
  };
  
  

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;