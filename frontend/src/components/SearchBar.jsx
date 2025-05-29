import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ artisans }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Cherche un artisan dont le nom correspond exactement (ou partiellement) au searchTerm
    const found = artisans.find(artisan =>
      artisan.nom.toLowerCase() === searchTerm.toLowerCase()
    );
    if (found) {
      navigate(`/artisans/${found.id}`);
    } else {
      alert("Artisan non trouvé");
    }
  };

  // Option : gérer la touche "Enter"
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative flex">
      <input
        type="text"
        placeholder="Rechercher un artisan par nom..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyDown={onKeyDown}
        className="w-full pl-10 pr-4 py-2 border rounded-l-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-full px-4 flex items-center"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
