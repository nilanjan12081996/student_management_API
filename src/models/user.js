'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Organization, { foreignKey: 'organization_id' });
      User.hasMany(models.Submission, { foreignKey: 'user_id' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    role: DataTypes.ENUM('superadmin', 'admin', 'teacher', 'tutor', 'student'),
    organization_id: DataTypes.INTEGER,
    class: DataTypes.STRING,
    semester: DataTypes.STRING,
    course: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};