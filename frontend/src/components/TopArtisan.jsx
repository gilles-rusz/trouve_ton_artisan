import React, { useEffect, useState } from 'react';

export default function TopArtisans() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/artisans/top') // adapte selon ton endpoint réel
      .then(res => res.json())
      .then(data => {
        setArtisans(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <section>
      <h2>Artisans du mois</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {artisans.map(artisan => (
          <div key={artisan.id} className="p-4 border rounded shadow">
            <h3>{artisan.nom}</h3>
            <p>Note : {artisan.note} ⭐</p>
            <p>Spécialité : {artisan.Specialite?.nom || 'Non renseignée'}</p>
            <p>Localisation : {artisan.localisation}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
