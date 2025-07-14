'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Clicks', 'region', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Clicks', 'browser', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Clicks', 'browserVersion', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Clicks', 'os', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Clicks', 'deviceType', {
      type: Sequelize.STRING
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Clicks', 'region');
    await queryInterface.removeColumn('Clicks', 'browser');
    await queryInterface.removeColumn('Clicks', 'browserVersion');
    await queryInterface.removeColumn('Clicks', 'os');
    await queryInterface.removeColumn('Clicks', 'deviceType');
  }
};