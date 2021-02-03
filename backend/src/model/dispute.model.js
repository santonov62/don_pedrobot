const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db')

const Dispute = sequelize.define('dispute', {
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING
  },
  message_id: {
    type: DataTypes.STRING
  },
  chat_id: {
    type: DataTypes.STRING
  },
  resolved_at: {
    type: DataTypes.DATE
  },
  expired_at: {
    type: DataTypes.DATE
  }
}, {
  // Other model options go here
  raw: true,
});

module.exports = Dispute;