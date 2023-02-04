"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv = require("dotenv").config();
const sequelize = new sequelize_1.Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, {
    host: `${process.env.DB_HOST}`,
    dialect: "mariadb",
});
const Message = sequelize.define("Message", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    author: { type: sequelize_1.DataTypes.STRING },
    content: { type: sequelize_1.DataTypes.STRING(500) }
});
exports.default = sequelize.model("Message");
