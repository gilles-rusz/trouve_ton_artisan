import React from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  // Ajouter un slug en minuscules et sans accents
  const categories = [
    { id: 1, name: "Alimentation", slug: "alimentation" },
    { id: 2, name: "Bâtiment", slug: "batiment" },
    { id: 3, name: "Fabrication", slug: "fabrication" },
    { id: 4, name: "Service", slug: "service" },
  ];

  const handleCategorieClick = (slug) => {
    navigate(`/${slug}`);
  };

  const handleReset = () => {
    navigate('/');
  };

  return (
    <header className="shadow-md bg-white">
      <div className="flex items-center justify-between p-4">
        <div>
          <img src="../Logo.png" alt="Logo Trouve ton artisan" className="h-24 w-auto" />
        </div>

        <button
          className="p-2 text-blue-800 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>

        <nav className="hidden md:flex gap-4 items-center">
          <button onClick={handleReset} className="text-blue-800 hover:underline">Accueil</button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorieClick(cat.slug)}
              className="text-blue-800 hover:underline"
            >
              {cat.name}
            </button>
          ))}
        </nav>
      </div>

      {isOpen && (
        <nav className="bg-blue-700 p-4 md:hidden">
          <ul className="space-y-2">
            <li>
              <button onClick={() => {handleReset(); setIsOpen(false);}} className="block text-white hover:underline w-full text-left">Tous</button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button onClick={() => {handleCategorieClick(cat.slug); setIsOpen(false);}} className="block text-white hover:underline w-full text-left">
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
