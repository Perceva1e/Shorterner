module.exports = (sequelize, DataTypes) => {
  const Click = sequelize.define('Click', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ipAddress: DataTypes.STRING,
    userAgent: DataTypes.TEXT,
    referrer: DataTypes.STRING
  }, {
    timestamps: true,
    createdAt: 'timestamp',
    updatedAt: false
  });
  Click.associate = (models) => {
    Click.belongsTo(models.Url, {
      foreignKey: 'urlId',
      as: 'url'
    });
  };

  return Click;
};