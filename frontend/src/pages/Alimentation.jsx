import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArtisanCard from "../components/ArtisanCard";


function Alimentation() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/artisans?categorie=alimentation')
      .then(res => {
        if (!res.ok) throw new Error('Erreur réseau');
        return res.json();
      })
      .then(data => {
        setArtisans(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Artisans Alimentation</h1>

        {loading && <p>Chargement...</p>}
        {error && <p className="text-red-500">Erreur : {error}</p>}

        {!loading && !error && (
          artisans.length === 0 ? (
            <p>Aucun artisan trouvé.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {artisans.map(artisan => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))}
            </div>
          )
        )}
      </main>
      <Footer />
    </>
  );
}

export default Alimentation;

