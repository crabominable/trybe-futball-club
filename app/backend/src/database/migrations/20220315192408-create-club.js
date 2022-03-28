'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clubs', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clubName: {
        type: Sequelize.STRING,
        field: 'club_name',
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clubs');
  }
};