import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const StarRating = ({ note }) => {
  const stars = [];
  const fullStars = Math.floor(note);
  const halfStar = note % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) stars.push("full");
  if (halfStar) stars.push("half");
  for (let i = 0; i < emptyStars; i++) stars.push("empty");

  return (
    <div className="flex justify-center mb-2 text-yellow-400 text-xl">
      {stars.map((type, idx) => {
        if (type === "full") return <span key={idx}>★</span>;
        if (type === "half") return <span key={idx}>☆</span>; // demi-étoile
        return <span key={idx} className="text-gray-300">★</span>;
      })}
    </div>
  );
};

const FicheArtisan = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [form, setForm] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const res = await axios.get(`/api/artisans/${id}`);
        setArtisan(res.data);
        console.log("Données artisan reçues :", res.data);
      } catch (err) {
        console.error("Erreur chargement artisan", err);
      }
    };
    fetchArtisan();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/contact", {
        artisanId: id,
        ...form,
      });
      setFormStatus("Message envoyé ! Merci de votre contact.");
      setForm({ nom: "", email: "", objet: "", message: "" });
    } catch (err) {
      setFormStatus("Erreur lors de l'envoi du message.");
      console.error(err);
    }
  };

  if (!artisan) return <p>Chargement...</p>;

  return (
    <>
      <Header />


      <div className="mt-8 mb-16 p-6 max-w-3xl mx-auto bg-white rounded shadow space-y-6">


        <div className="text-center">
          <img
            src={"../artisan-default.png"}
            alt={artisan.nom}
            className="h-40 mx-auto object-contain rounded-xl mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{artisan.nom}</h1>
          <StarRating note={artisan.note || 0} />
          <p className="text-gray-700 italic">{artisan.specialite?.nom || "Spécialité non renseignée"}</p>
          <p className="text-gray-500">{artisan.ville}</p>
          {artisan.site_web && (
            <a
              href={artisan.site_web}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Site web
            </a>
          )}
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-2">À propos</h2>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Contacter cet artisan</h2>
          {formStatus && (
            <p className={`mb-4 font-semibold ${formStatus.includes("Erreur") ? "text-red-600" : "text-green-600"}`}>
              {formStatus}
            </p>
          )}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              name="nom"
              placeholder="Votre nom"
              value={form.nom}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              name="email"
              type="email"
              placeholder="Votre email"
              value={form.email}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              name="objet"
              placeholder="Objet"
              value={form.objet}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <textarea
              name="message"
              placeholder="Votre message"
              value={form.message}
              onChange={handleChange}
              required
              className="p-2 border rounded"
              rows={5}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Envoyer
            </button>
          </form>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default FicheArtisan;
