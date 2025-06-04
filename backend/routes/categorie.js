const express = require('express');
const router = express.Router();
const { Categorie, Specialite } = require('../models');
const { body, validationResult } = require('express-validator');

console.log('Route catégorie chargée');


const categorieValidationRules = [
  body('nom').trim().notEmpty().withMessage('Le nom est obligatoire'),
];


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


router.get('/', async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      include: [{ model: Specialite, as: 'specialites' }],
      order: [['nom', 'ASC']],
    });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id, {
      include: [{ model: Specialite, as: 'specialites' }],
    });
    if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée' });
    res.json(categorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


router.post('/', categorieValidationRules, validate, async (req, res) => {
  try {
    const { nom } = req.body;
    
    const exist = await Categorie.findOne({ where: { nom } });
    if (exist) return res.status(400).json({ message: 'Cette catégorie existe déjà' });

    const newCategorie = await Categorie.create({ nom });
    res.status(201).json(newCategorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


router.put('/:id', categorieValidationRules, validate, async (req, res) => {
  try {
    const { nom } = req.body;
    const categorie = await Categorie.findByPk(req.params.id);
    if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée' });

    
    const exist = await Categorie.findOne({ where: { nom, id: { [Categorie.sequelize.Op.ne]: req.params.id } } });
    if (exist) return res.status(400).json({ message: 'Cette catégorie existe déjà' });

    categorie.nom = nom;
    await categorie.save();

    res.json(categorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const categorie = await Categorie.findByPk(req.params.id);
    if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée' });

    await categorie.destroy();
    res.json({ message: 'Catégorie supprimée' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
