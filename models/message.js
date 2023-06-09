const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Group = require('./group');

const Message = sequelize.define("message", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name:{
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.STRING,
  },
  groupname:{
    type:Sequelize.STRING,
    allowNull: false,
    references:{
      model:Group,
      key: "name",
    },
  },
});

module.exports = Message;
