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

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

export default sequelize.model("User");
