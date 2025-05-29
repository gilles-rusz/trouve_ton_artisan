const express = require('express');
const router = express.Router();
const { Artisan, Specialite, Categorie, Op, sequelize } = require('../models');
const { body, validationResult } = require('express-validator');

// Validation middleware avec ajout site_web et image_url en URL optionnelles
const artisanValidationRules = [
  body('nom').notEmpty().withMessage('Le nom est obligatoire'),
  body('ville').notEmpty().withMessage('La ville est obligatoire'),
  body('email').isEmail().withMessage('Email invalide'),
  body('specialiteId').isInt().withMessage('Spécialité invalide'),
  body('note')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('La note doit être comprise entre 0 et 5'),
  body('site_web').optional({ checkFalsy: true }).isURL().withMessage('URL du site web invalide'),
  body('image_url').optional({ checkFalsy: true }).isURL().withMessage('URL de l\'image invalide'),
];

// Middleware pour gérer les erreurs de validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET /api/artisans avec filtres optionnels
router.get('/', async (req, res) => {
  try {
    const { categorieId, specialiteId, ville } = req.query;

    const categorieIdInt = categorieId ? parseInt(categorieId, 10) : null;
    const specialiteIdInt = specialiteId ? parseInt(specialiteId, 10) : null;

    const where = {};
    if (specialiteIdInt) where.specialiteId = specialiteIdInt;

    if (ville) {
      where.ville = sequelize.where(
        sequelize.fn('LOWER', sequelize.col('ville')),
        { [Op.like]: `%${ville.toLowerCase()}%` }
      );
    }

    const includeSpecialite = {
      model: Specialite,
      as: 'specialite',
      include: [
        {
          model: Categorie,
          as: 'categorie',
          where: categorieIdInt ? { id: categorieIdInt } : undefined,
          required: categorieIdInt ? true : false,
        },
      ],
    };

    const artisans = await Artisan.findAll({
      where,
      include: [includeSpecialite],
    });

    res.json(artisans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// GET artisans avec la meilleure note
router.get('/top', async (req, res) => {
  try {
    const bestNote = await Artisan.max('note');
    const topArtisans = await Artisan.findAll({
      where: { note: bestNote },
      include: [
        {
          model: Specialite,
          as: 'specialite',
          include: [{ model: Categorie, as: 'categorie' }],
        },
      ],
    });
    res.json(topArtisans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des meilleurs artisans', error });
  }
});

// GET artisan par ID
router.get('/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: [
        {
          model: Specialite,
          as: 'specialite',
          include: [{ model: Categorie, as: 'categorie' }],
        },
      ],
    });
    if (!artisan) return res.status(404).json({ message: 'Artisan non trouvé' });
    res.json(artisan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST création artisan avec validation
router.post('/', artisanValidationRules, validate, async (req, res) => {
  try {
    const {
      nom,
      ville,
      note,
      email,
      a_propos,
      specialiteId,
      site_web,
      image_url,
    } = req.body;

    const newArtisan = await Artisan.create({
      nom,
      ville,
      note,
      email,
      a_propos,
      specialiteId,
      site_web,
      image_url,
    });

    res.status(201).json(newArtisan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// PUT modification artisan avec validation
router.put('/:id', artisanValidationRules, validate, async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ message: 'Artisan non trouvé' });

    const {
      nom,
      ville,
      note,
      email,
      a_propos,
      specialiteId,
      site_web,
      image_url,
    } = req.body;

    artisan.nom = nom !== undefined ? nom : artisan.nom;
    artisan.ville = ville !== undefined ? ville : artisan.ville;
    artisan.note = note !== undefined ? note : artisan.note;
    artisan.email = email !== undefined ? email : artisan.email;
    artisan.a_propos = a_propos !== undefined ? a_propos : artisan.a_propos;
    artisan.specialiteId = specialiteId !== undefined ? specialiteId : artisan.specialiteId;
    artisan.site_web = site_web !== undefined ? site_web : artisan.site_web;
    artisan.image_url = image_url !== undefined ? image_url : artisan.image_url;

    await artisan.save();

    res.json(artisan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// DELETE artisan
router.delete('/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ message: 'Artisan non trouvé' });

    await artisan.destroy();
    res.json({ message: 'Artisan supprimé' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

