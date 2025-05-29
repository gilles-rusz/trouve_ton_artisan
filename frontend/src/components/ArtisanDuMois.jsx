import React from 'react';


const renderStars = (note) => {
  const fullStars = Math.floor(note);
  const halfStar = note % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <span className="text-yellow-400" aria-label={`Note ${note} sur 5`}>
      {'★'.repeat(fullStars)}
      {halfStar && '½'}
      {'☆'.repeat(emptyStars)}
    </span>
  );
};

const ArtisanDuMois = ({ artisans }) => {
  // Si pas de données, fallback statique
  const artisansToDisplay = artisans && artisans.length > 0
    ? artisans.slice(0, 3)
    : [
      {
        id: 1,
        nom: 'Entreprise Dupont',
        note: 5,
        specialite: { nom: 'Électricité générale' },
        ville: 'Paris',
      },
      {
        id: 2,
        nom: 'Menuiserie Martin',
        note: 4,
        specialite: { nom: 'Menuiserie bois' },
        ville: 'Lyon',
      },
      {
        id: 3,
        nom: 'Plomberie Services',
        note: 5,
        specialite: { nom: 'Plomberie sanitaire' },
        ville: 'Marseille',
      },
    ];

  return (
    <section className="my-12 text-center">
      <h2 className="text-3xl font-bold mb-8">Les trois artisans du mois</h2>
      <div className="flex justify-center gap-8 flex-wrap">
        {artisansToDisplay.map(({ id, nom, note, specialite, ville }) => (
          <div key={id} className="bg-white rounded-lg shadow-md p-6 w-64">
            <h3 className="text-xl font-semibold mb-2">{nom}</h3>
            <p className="mb-2">
              {renderStars(note)} <span className="text-gray-700">({note}/5)</span>
            </p>
            <p className="mb-1"><span className="font-semibold">Spécialité :</span> Alimentation</p>
            <p><span className="font-semibold">Localisation :</span> {ville || 'N/A'}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtisanDuMois;
