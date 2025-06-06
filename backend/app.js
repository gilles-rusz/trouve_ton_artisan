require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { sequelize } = require('./models');
const artisanRoutes = require('./routes/artisanRoutes');
const specialiteRoutes = require('./routes/specialite');
const categorieRoutes = require('./routes/categorie');
const contactRoutes = require('./routes/contact'); // Si tu veux le réactiver plus tard
const apiKeyMiddleware = require('./middlewares/apiKeyMiddleware');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();

app.get('/direct-test', (req, res) => {
  res.json({ message: 'Direct test OK depuis app.js' });
});

console.log('artisanRoutes:', artisanRoutes);
console.log('categorieRoutes:', categorieRoutes);
console.log('specialiteRoutes:', specialiteRoutes);

app.use(rateLimiter()); 
app.use(helmet());
app.use(cors());

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

// routes API
app.use('/api/artisans', artisanRoutes);
app.use('/api/specialites', specialiteRoutes);
app.use('/api', contactRoutes); 
app.use('/api/categories', categorieRoutes);

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Démarrage du serveur
async function startServer() {
  try {
    await sequelize.sync();
    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation avec la base :', error);
    process.exit(1);
  }
}
// 📋 Affiche toutes les routes Express chargées
console.log('\n📌 Liste des routes chargées :');
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    // C'est une route directe
    const route = middleware.route;
    const method = Object.keys(route.methods)[0].toUpperCase();
    console.log(`  ${method} ${route.path}`);
  } else if (middleware.name === 'router') {
    // C'est un router importé (comme avec app.use)
    middleware.handle.stack.forEach((handler) => {
      const route = handler.route;
      if (route) {
        const method = Object.keys(route.methods)[0].toUpperCase();
        console.log(`  ${method} ${route.path}`);
      }
    });
  }
});

startServer();

