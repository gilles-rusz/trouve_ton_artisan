import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0074c7' }} className="text-white p-4">

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Informations légales</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/mentions-legales" className="hover:underline">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link to="/donnees-personnelles" className="hover:underline">
                Données personnelles
              </Link>
            </li>
            <li>
              <Link to="/accessibilite" className="hover:underline">
                Accessibilité
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:underline">
                Cookies
              </Link>
            </li>
          </ul>
        </div>

    
        <div>
          <h2 className="text-lg font-semibold mb-2">Antenne régionale</h2>
          <address className="not-italic text-sm leading-relaxed">
            101 cours Charlemagne<br />
            CS 20033<br />
            69269 LYON CEDEX 02<br />
            France<br />
            Tel : +33 (0)4 26 73 40 00
          </address>
        </div>

    
        <div className="flex flex-col items-start md:items-end">
          <img
            src=""
            alt="Trouve ton artisan"
            className="h-10 mb-2"
          />
          <p className="text-sm text-gray-400">&copy; 2025 Trouve ton artisan</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

