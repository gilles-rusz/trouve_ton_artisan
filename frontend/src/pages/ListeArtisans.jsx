import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtisanCard from "../components/ArtisanCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ListeArtisans() {
  const { categorie } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    fetch(`${API_URL}/api/artisans?categorie=${categorie}`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur réseau");
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
  }, [categorie]);

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">
          Artisans catégorie : {categorie.charAt(0).toUpperCase() + categorie.slice(1)}
        </h1>

        {loading && <p>Chargement...</p>}
        {error && <p className="text-red-500">Erreur : {error}</p>}

        {!loading && !error && (
          artisans.length === 0 ? (
            <p>Aucun artisan trouvé dans cette catégorie.</p>
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

export default ListeArtisans;