module.exports = (sequelize, DataTypes) => {
  const Artisan = sequelize.define('Artisan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    ville: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    a_propos: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    site_web: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    specialiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'specialites',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    top: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    tableName: 'artisans',
    timestamps: false,
  });

  Artisan.associate = (models) => {
    Artisan.belongsTo(models.Specialite, {
      foreignKey: 'specialiteId',
      as: 'specialite',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };

  return Artisan;
};

