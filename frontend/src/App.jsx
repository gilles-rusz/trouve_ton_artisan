import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import FicheArtisan from "./pages/FicheArtisan";

import Alimentation from "./pages/Alimentation";
import Batiment from "./pages/Batiment";
import Fabrication from "./pages/Fabrication";
import Service from "./pages/Services";

import MentionsLegales from "./pages/MentionsLegales";
import LegalPage from './pages/LegalPage';
import Page404 from "./pages/Page404";

function App() {
  const [message, setMessage] = useState("Chargement...");

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    fetch(`${API_URL}/api/hello`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur HTTP");
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error("Erreur API :", err);
        setMessage("⚠️ Erreur de connexion à l'API");
      });
  }, []);

  return (
    <Router>
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Routes distinctes pour chaque catégorie */}
          <Route path="/alimentation" element={<Alimentation />} />
          <Route path="/batiment" element={<Batiment />} />
          <Route path="/fabrication" element={<Fabrication />} />
          <Route path="/service" element={<Service />} />

          <Route path="/artisans/:id" element={<FicheArtisan />} />
          <Route path="/mentions-legales" element={<MentionsLegales title="Mentions légales" />} />
          <Route path="/donnees-personnelles" element={<LegalPage title="Données personnelles" />} />
          <Route path="/accessibilite" element={<LegalPage title="Accessibilité" />} />
          <Route path="/cookies" element={<LegalPage title="Cookies" />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;





