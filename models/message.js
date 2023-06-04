const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

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
  groupId:{
    type:Sequelize.INTEGER,
    allowNull: false,
    references:{
      model:Group,
      key: "id",
    },
  },
});

module.exports = Message;
