const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {

  const User = sequelize.define('User', {

    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [5]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false
    },

    rightEar: {
      type: DataTypes.STRING,
      defaultValue: '[null, null, null, null, null, null, null]'
    }, // stringified array of decibel level number values - should be an array of 7 numbers between 20 and -120

    leftEar:  {
      type: DataTypes.STRING,
      defaultValue: '[null, null, null, null, null, null, null]'
    } // stringified array of decibel level number values - should be an array of 7 numbers between 20 and -120

  });

  User.associate = function(models){
    User.hasMany(models.AudioBlob, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true
      }
    })
  }

  User.beforeCreate(function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  })

  return User;

};