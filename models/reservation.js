"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class reservation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            reservation.belongsTo(models.car, { foreignKey: "car_id" });
            reservation.belongsTo(models.customer, {
                foreignKey: "customer_id",
            });
        }
    }
    reservation.init(
        {
            reservationDate: DataTypes.DATE,
            returnDate: DataTypes.DATE,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "reservation",
            paranoid: true,
        }
    );
    return reservation;
};
