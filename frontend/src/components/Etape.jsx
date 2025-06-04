import React from 'react';

const Etape = () => {
  return (
    <section className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-blue-700">Comment trouver mon artisan ?</h2>
      <ul className="space-y-2 text-sm text-gray-700">
        <li>
          <span className="font-bold">Étape 1</span> : Choisir la catégorie d'artisan dans le menu
        </li>
        <li>
          <span className="font-bold">Étape 2</span> : Choisir un artisan
        </li>
        <li>
          <span className="font-bold">Étape 3</span> : Le contacter via le formulaire de contact
        </li>
        <li>
          <span className="font-bold">Étape 4</span> : L'équipe région vous apporte une aide sous 48h
        </li>
      </ul>
    </section>
  );
};

export default Etape;
