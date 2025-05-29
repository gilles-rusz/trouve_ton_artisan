module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'categories',
    timestamps: false,
  });

  Categorie.associate = (models) => {
    Categorie.hasMany(models.Specialite, {
      as: 'specialites',
      foreignKey: 'categorieId',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };

  return Categorie;
};
