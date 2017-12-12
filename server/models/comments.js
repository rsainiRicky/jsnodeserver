module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define('_tblComment', {
        id: {
            type:DataTypes.STRING,
            primaryKey: true
        },
        content: DataTypes.STRING
    });
    return Comment;
}
