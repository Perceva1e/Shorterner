'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clicks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      urlId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Urls',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ipAddress: {
        type: Sequelize.STRING,
      },
      userAgent: {
        type: Sequelize.TEXT,
      },
      referrer: {
        type: Sequelize.STRING,
      },
      region: {
        type: Sequelize.STRING,
      },
      browser: {
        type: Sequelize.STRING,
      },
      browserVersion: {
        type: Sequelize.STRING,
      },
      os: {
        type: Sequelize.STRING,
      },
      deviceType: {
        type: Sequelize.STRING,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Clicks');
  },
};
