import { Sequelize, DataTypes } from "sequelize";
const dotenv = require("dotenv").config();

const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASS}`,
  {
    host: `${process.env.DB_HOST}`,
    dialect: "mariadb",
  }
);

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  author: { type: DataTypes.STRING },
  content: { type: DataTypes.STRING(500) },
});

export default sequelize.model("Message");
