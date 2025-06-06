const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { sequelize, Categorie, Specialite, Artisan, Sequelize } = require('./models');
const artisanRoutes = require('./routes/artisanRoutes'); 
const categorieRoutes = require('./routes/categorie');
const specialiteRoutes = require('./routes/specialite');

const { Op } = Sequelize;

const allowedOrigins = [
  'https://trouve-ton-artisan-xls3.vercel.app/',
  'http://localhost:5173'
];


app.use((req, res, next) => {
  console.log(`Requête ${req.method} vers ${req.path} avec origine: ${req.headers.origin}`);
  next();
});

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Requête CORS origine:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Gestion des requêtes preflight OPTIONS
app.options('*', cors(corsOptions));

// Middleware CORS
app.use(express.json());
app.use(cors(corsOptions));



app.use('/api/artisans', artisanRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/specialites', specialiteRoutes);

// Test connexion à la base
sequelize.authenticate()
  .then(() => console.log('Connexion à la DB réussie'))
  .catch(err => console.error('Erreur de connexion DB:', err));

sequelize.sync({ alter: true }) 
  .then(() => console.log('Modèles synchronisés'))
  .catch(err => console.error('Erreur synchronisation:', err));


app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      include: [{ model: Specialite, as: 'specialites' }]
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/artisans', async (req, res) => {
  try {
    const { categorie, specialite, recherche } = req.query;
    let whereSpecialite = {};
    let whereArtisan = {};

    if (recherche) {
      whereArtisan.nom = { [Op.like]: `%${recherche}%` };
    }

    if (specialite) {
      whereSpecialite.nom = specialite;
    }

    if (categorie) {
      whereSpecialite.categorieId = categorie;
    }

    const artisans = await Artisan.findAll({
      where: whereArtisan,
      include: [{
        model: Specialite,
        as: 'specialite',
        where: whereSpecialite,
        include: [{ model: Categorie, as: 'categorie' }]
      }]
    });

    res.json(artisans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/artisans/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: [{
        model: Specialite,
        as: 'specialite',
        include: [{ model: Categorie, as: 'categorie' }]
      }]
    });
    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé' });
    res.json(artisan);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'API en ligne' });
});

app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({ error: err.message });
  } else {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`API démarrée sur http://localhost:${port}`);
});
