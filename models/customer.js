"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            customer.hasMany(models.reservation, { foreignKey: "customer_id" });
        }
    }
    customer.init(
        {
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            phoneNumber: DataTypes.BIGINT,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "customer",
            paranoid: true,
        }
    );
    return customer;
};
