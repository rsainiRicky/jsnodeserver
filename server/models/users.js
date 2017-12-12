module.exports = (sequelize, DataTypes) =>
    sequelize.define('_tblUsers', {
        email: {
            type:DataTypes.STRING,
            primaryKey: true
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        accessKey: DataTypes.STRING,
        role : DataTypes.STRING
    });
    