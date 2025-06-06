import React, { useState } from "react";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { name: "Alimentation", path: "/categorie/alimentation" },
    { name: "Bâtiment", path: "/categorie/batiment" },
    { name: "Fabrication", path: "/categorie/fabrication" },
    { name: "Service", path: "/categorie/service" },
  ];

  return (
    <nav className="bg-blue-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-white text-lg font-bold">Artisans</span>

        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6`}
        >
          {categories.map((cat) => (
            <Link
              key={cat.path}
              to={cat.path}
              className="block mt-2 md:mt-0 text-white hover:underline"
              onClick={() => setIsOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BurgerMenu;
