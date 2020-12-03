module.exports = function (sequelize, DataTypes) {

    const AudioBlob = sequelize.define('AudioBlob', {

        audioURL: DataTypes.STRING,

        recordingName: DataTypes.STRING

    });

    AudioBlob.associate = function (models) {
        AudioBlob.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return AudioBlob;

};