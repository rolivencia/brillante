'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkUpdate('user', { has_finished_registration: 1 }, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkUpdate('user', { has_finished_registration: null }, {});
    },
};
