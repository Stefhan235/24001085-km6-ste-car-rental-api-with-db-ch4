"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class car extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            car.hasMany(models.reservation, { foreignKey: "car_id" });
        }
    }
    car.init(
        {
            brand: DataTypes.STRING,
            model: DataTypes.STRING,
            plate: DataTypes.STRING,
            image: DataTypes.TEXT,
            type: DataTypes.STRING,
            transmission: DataTypes.STRING,
            year: DataTypes.INTEGER,
            capacity: DataTypes.INTEGER,
            rentPerDay: DataTypes.INTEGER,
            available: DataTypes.BOOLEAN,
            availableAt: DataTypes.DATE,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "car",
            paranoid: true,
        }
    );
    return car;
};
