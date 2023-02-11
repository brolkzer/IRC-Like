import { Sequelize, DataTypes } from "sequelize";
const dotenv = require("dotenv").config();

const sequelize = new Sequelize(`${process.env.DB_CLOUD}`);

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  author: { type: DataTypes.STRING },
  content: { type: DataTypes.STRING(500) },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn("current_timestamp"),
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn("current_timestamp"),
  },
});

export default sequelize.model("Message");
