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
    unique: true,
  },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.fn("current_timestamp"),
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    defaultValue: Sequelize.fn("current_timestamp"),
  },
});

export default sequelize.model("User");
