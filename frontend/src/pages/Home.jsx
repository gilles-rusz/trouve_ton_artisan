import React, { useEffect, useState } from 'react';
import { fetchArtisans } from '../api-temp';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Etape from '../components/Etape';
import ArtisanDuMois from '../components/ArtisanDuMois';
import Footer from '../components/Footer';

const Home = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchArtisans()
      .then(data => {
        setArtisans(data);
        setLoading(false);
      })
      .catch(() => {
        setErreur(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (erreur) return <p>Erreur de connexion à l'API</p>;

  return (

    <div className="flex flex-col min-h-screen">
      <Header isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <main className="flex-1 p-4 space-y-6">
        <SearchBar artisans={artisans} />
        <Etape />
        <ArtisanDuMois artisans={artisans} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

