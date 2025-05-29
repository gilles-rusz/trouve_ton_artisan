const sequelize = require('./config/database');
const { DataTypes } = require('sequelize');

console.log('sequelize:', sequelize);

const Artisan = sequelize.define('Artisan', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: DataTypes.STRING,
}, {
  tableName: 'artisan',
  timestamps: false
});

console.log('Modèle Artisan créé');

sequelize.authenticate()
  .then(() => console.log('Connexion OK'))
  .catch(err => console.error('Erreur connexion:', err));
