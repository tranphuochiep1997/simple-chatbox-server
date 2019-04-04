'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    ownerId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models['User'], { as: 'owner', foreignKey: 'ownerId' });
  };
  return Message;
};