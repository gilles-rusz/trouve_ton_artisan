const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { sequelize, Categorie, Specialite, Artisan } = require('./models');
const artisanRoutes = require('./routes/artisanRoutes'); 
const categorie = require('./routes/categorie');
const specialiteRoutes = require('./routes/specialite');



const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173', // ton frontend local
  'https://trouve-ton-artisan.vercel.app' // ton frontend en ligne sur Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use(express.json());

app.use('/api/artisans', artisanRoutes);
app.use('/api/categories', categorie);
app.use('/api/specialites', specialiteRoutes);

// Test connexion à la base

sequelize.authenticate()
  .then(() => console.log('Connexion à la DB réussie'))
  .catch(err => console.error('Erreur de connexion DB:', err));

sequelize.sync({ alter: true }) 
  .then(() => console.log('Modèles synchronisés'))
  .catch(err => console.error('Erreur synchronisation:', err));

// Route pour récupérer toutes les catégories avec leurs spécialités

app.get('/categories', async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      include: [{ model: Specialite, as: 'specialites' }]
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


app.get('/artisans', async (req, res) => {
  try {
    const { categorie, specialite, recherche } = req.query;
    let whereSpecialite = {};
    let whereArtisan = {};

    if (recherche) {
      whereArtisan.nom = { [sequelize.Op.like]: `%${recherche}%` };
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

// Route pour un artisan par ID

app.get('/artisans/:id', async (req, res) => {
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


app.listen(port, () => {
  console.log(`API démarrée sur http://localhost:${port}`);
});
