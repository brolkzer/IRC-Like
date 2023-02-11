import express from "express";
import messagesRoutes from "./routes/messages";
import usersRoutes from "./routes/users";
import { Sequelize } from "sequelize";
const dotenv = require("dotenv").config();
import Messages from "./models/Messages";
import Users from "./models/Users";
import cors from "cors";
import { Socket } from "socket.io";

/* Initialize DB Server */

// const sequelize = new Sequelize(
//   `${process.env.DB_NAME}`,
//   `${process.env.DB_USER}`,
//   `${process.env.DB_PASS}`,
//   {
//     host: `${process.env.DB_HOST}`,
//     dialect: "mariadb",
//   }
// ) || new Sequelize(`${process.env.DB_CLOUD}`);

const sequelize = new Sequelize(`${process.env.DB_CLOUD}`);
// ||
// new Sequelize(
//   `${process.env.DB_NAME}`,
//   `${process.env.DB_USER}`,
//   `${process.env.DB_PASS}`,
//   { host: `${process.env.DB_HOST}`, dialect: "mariadb" }
// );

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
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
const http = require("http").Server(app);

http.listen(3001, function () {
  console.log("server running on port 3001");
  messagesRoutes(app);
  usersRoutes(app);
});

// Initialize sockets
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  },
});

// Connect to client
// Listen for emitions when new messages are pushed
// Push back to clients so they get new messages
io.on("connection", (socket: Socket) => {
  socket.on("send-message", (messageSent) => {
    io.emit("client-messages-update", JSON.stringify(messageSent), () => {});
  });
});
