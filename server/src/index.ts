import express from "express";
import messagesRoutes from "./routes/messages";
import usersRoutes from "./routes/users";
import { Sequelize } from "sequelize";
const dotenv = require("dotenv").config();
import Messages from "./models/Messages";
import Users from "./models/Users";

/* Initialize DB Server */

const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASS}`,
  {
    host: `${process.env.DB_HOST}`,
    dialect: "mariadb",
  }
);

/* Immediately Invoked Function Expression */

(async () => {
  try {
    await sequelize.authenticate();
    await Messages.sync({ alter: true });
    await Users.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send("hello world");
});

http.listen(3001, function () {
  console.log("server running on port 3001");
  messagesRoutes(app);
  usersRoutes(app);
});
