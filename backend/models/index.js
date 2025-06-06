const { Sequelize, DataTypes, Op } = require('sequelize');

// Connexion à la base MySQL
const sequelize = new Sequelize('trouve-ton-artisan', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// Import des modèles
const Categorie = require('./categorie')(sequelize, DataTypes);
const Specialite = require('./specialite')(sequelize, DataTypes);
const Artisan = require('./artisan')(sequelize, DataTypes);

// les modèles dans un objet
const models = {
  Categorie,
  Specialite,
  Artisan,
};

// les associations 
Object.values(models).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

// Export du contexte Sequelize et des modèles
module.exports = {
  sequelize,
  Sequelize,
  Op,
  ...models,
};
