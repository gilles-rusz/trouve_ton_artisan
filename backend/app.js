require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { sequelize } = require('./models');
const artisanRoutes = require('./routes/artisanRoutes');
const specialiteRoutes = require('./routes/specialite');
const categorieRoutes = require('./routes/categorie');
const contactRoutes = require('./routes/contact');
const apiKeyMiddleware = require('./middlewares/apiKeyMiddleware');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();

app.get('/direct-test', (req, res) => {
  res.json({ message: 'Direct test OK depuis app.js' });
});

console.log('artisanRoutes:', artisanRoutes);
console.log('categorieRoutes:', categorieRoutes);
console.log('specialiteRoutes:', specialiteRoutes);

app.use(rateLimiter()); // ton middleware perso
app.use(helmet());
app.use(cors());

// Limiter le nombre de requêtes par IP (express-rate-limit)
// Tu peux choisir d'enlever soit celui-ci soit rateLimiter() pour éviter doublon
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: "Trop de requêtes, veuillez réessayer plus tard." }
});
app.use(limiter);

app.use(express.json());
app.use(apiKeyMiddleware);

app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test OK' });
});

// routes
app.use('/api/artisans', artisanRoutes);
app.use('/api/specialites', specialiteRoutes);
app.use('/api', contactRoutes);
app.use('/api/categories', categorieRoutes);

// 404 erreur
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Fonction principale pour démarrer le serveur
async function startServer() {
  try {
    await sequelize.sync();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Serveur en écoute sur le port ${PORT}`));
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation avec la base :', error);
    process.exit(1);
  }
}

startServer();
