module.exports = function(sequelize, DataTypes) {
  var Organization = sequelize.define("Organization", {
    name: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    org: {
      type: DataTypes.STRING
    },
    volunteers: {
      type: DataTypes.STRING
    },
    hours: {
      type: DataTypes.INTEGER
    }
  });
  return Organization;
};
