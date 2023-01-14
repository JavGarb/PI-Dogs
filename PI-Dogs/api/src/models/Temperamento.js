const { DataTypes } = require('sequelize');
//defino el modelo de temperamentos
module.exports = (sequelize) => {
    sequelize.define('Temperamento', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
        },
        name: {
            type: DataTypes.STRING,
        }
    })
}