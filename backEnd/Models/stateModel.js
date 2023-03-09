const sequelize = require('../Config/db.config');
const Sequelize = require('sequelize');
const Users = require("./userModel");
module.exports = (sequelize, DataTypes) => {

    const States = sequelize.define('states', {
        state_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        state_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        u_id: DataTypes.INTEGER,



    })
    return States
    // States.belongsTo(Users, { foreignKey: { allowNull: false } });
}
//Exporting the module
