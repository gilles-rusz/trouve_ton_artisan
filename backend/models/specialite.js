module.exports = (sequelize, DataTypes) => {
  const Specialite = sequelize.define('Specialite', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    categorieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'specialites',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['nom', 'categorieId'],
      }
    ],
  });

  Specialite.associate = (models) => {
    Specialite.belongsTo(models.Categorie, {
      foreignKey: 'categorieId',
      as: 'categorie',
      onDelete: 'CASCADE',
      hooks: true,
    });

    Specialite.hasMany(models.Artisan, {
      foreignKey: 'specialiteId',
      as: 'artisans',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };

  return Specialite;
};


