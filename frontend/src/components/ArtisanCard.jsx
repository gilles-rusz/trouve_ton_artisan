import { Link } from "react-router-dom";

const ArtisanCard = ({ artisan }) => {
  return (
    <Link to={`/artisans/${artisan.id}`} className="block hover:shadow-lg transition">
      <div className="bg-white relative rounded-2xl p-4 shadow-md mb-4">

        
        {artisan.top && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded">
            ⭐ TOP
          </span>
        )}

        
        <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
          <img
            src={"../Logo.png"}
            alt={artisan.nom}
            className="h-full object-contain"
          />
        </div>

  
        <h2 className="text-lg font-semibold">{artisan.nom}</h2>

      
        <div className="flex items-center mb-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < artisan.note ? "text-yellow-400" : "text-gray-300"}>
              ★
            </span>
          ))}
        </div>

        
        {artisan.specialite && artisan.specialite.nom && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Spécialité :</span> {artisan.specialite.nom}
          </p>
        )}

        
        <p className="text-sm text-gray-500">{artisan.ville}</p>
      </div>
    </Link>
  );
};

export default ArtisanCard;

