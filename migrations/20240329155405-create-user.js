"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
            },
            password: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            image: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            address: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            phoneNumber: {
                allowNull: true,
                type: Sequelize.BIGINT,
            },
            role: {
                allowNull: false,
                type: Sequelize.ENUM("user", "admin"),
                defaultValue: "user",
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
        await queryInterface.dropTable("users");
    },
};
