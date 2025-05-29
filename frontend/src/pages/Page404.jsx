import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Page404 = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <img
          src="../404.jpg"
          alt="Page non trouvée"
          className="max-w-xs mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">Page non trouvée</h1>
        <p className="text-gray-600 mb-4">
          La page que vous avez demandée n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="text-blue-600 underline">
          Retour à l'accueil
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default Page404;

