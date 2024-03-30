"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("cars", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            brand: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            model: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            plate: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            image: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            transmission: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            year: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            capacity: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            rentPerDay: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            available: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            availableAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("cars");
    },
};
