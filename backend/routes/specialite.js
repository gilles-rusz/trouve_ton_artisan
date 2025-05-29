const express = require('express');
const router = express.Router();
const { Specialite, Categorie, Artisan } = require('../models');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');

console.log("Route spécialité chargée");

// Validation middleware
const specialiteValidationRules = [
  body('nom').trim().notEmpty().withMessage('Le nom est obligatoire'),
  body('categorieId').isInt().withMessage('ID de catégorie invalide'),
];

// Middleware gestion erreurs validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET toutes les spécialités avec leur catégorie
router.get('/', async (req, res) => {
  try {
    const specialites = await Specialite.findAll({
      include: [{ model: Categorie, as: 'categorie' }],
      order: [['nom', 'ASC']],
    });
    res.json(specialites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// GET spécialité par ID avec catégorie et artisans
router.get('/:id', async (req, res) => {
  try {
    const specialite = await Specialite.findByPk(req.params.id, {
      include: [
        { model: Categorie, as: 'categorie' },
        { model: Artisan, as: 'artisans' },
      ],
    });
    if (!specialite) return res.status(404).json({ message: 'Spécialité non trouvée' });
    res.json(specialite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// POST création spécialité avec validation et vérification catégorie
router.post('/', specialiteValidationRules, validate, async (req, res) => {
  try {
    const { nom, categorieId } = req.body;

    // Vérifier que la catégorie existe
    const categorie = await Categorie.findByPk(categorieId);
    if (!categorie) {
      return res.status(400).json({ message: 'Catégorie invalide' });
    }

    // Vérifier doublon nom dans même catégorie
    const exist = await Specialite.findOne({ where: { nom, categorieId } });
    if (exist) {
      return res.status(400).json({ message: 'Cette spécialité existe déjà dans cette catégorie' });
    }

    const newSpecialite = await Specialite.create({ nom, categorieId });
    res.status(201).json(newSpecialite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// PUT modification spécialité avec validation
router.put('/:id', specialiteValidationRules, validate, async (req, res) => {
  try {
    const { nom, categorieId } = req.body;
    const specialite = await Specialite.findByPk(req.params.id);
    if (!specialite) return res.status(404).json({ message: 'Spécialité non trouvée' });

    // Vérifier catégorie si modifiée
    if (categorieId !== undefined) {
      const categorie = await Categorie.findByPk(categorieId);
      if (!categorie) {
        return res.status(400).json({ message: 'Catégorie invalide' });
      }
      specialite.categorieId = categorieId;
    }

    // Vérifier doublon nom dans même catégorie si nom modifié
    if (nom !== undefined) {
      const exist = await Specialite.findOne({
        where: {
          nom,
          categorieId: specialite.categorieId,
          id: { [Op.ne]: specialite.id },
        },
      });
      if (exist) {
        return res.status(400).json({ message: 'Cette spécialité existe déjà dans cette catégorie' });
      }
      specialite.nom = nom;
    }

    await specialite.save();

    res.json(specialite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// DELETE spécialité
router.delete('/:id', async (req, res) => {
  try {
    const specialite = await Specialite.findByPk(req.params.id);
    if (!specialite) return res.status(404).json({ message: 'Spécialité non trouvée' });

    await specialite.destroy();
    res.json({ message: 'Spécialité supprimée' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
