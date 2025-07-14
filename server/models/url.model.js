module.exports = (sequelize, DataTypes) => {
  const Url = sequelize.define('Url', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shortCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false
  });
   Url.associate = (models) => {
    Url.hasMany(models.Click, {
      foreignKey: 'urlId',
      as: 'clicks' 
    });
  };

  return Url;
};