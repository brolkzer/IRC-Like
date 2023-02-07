"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messages_1 = __importDefault(require("./routes/messages"));
const sequelize_1 = require("sequelize");
const dotenv = require("dotenv").config();
const Messages_1 = __importDefault(require("./models/Messages"));
/* Initialize DB Server */
const sequelize = new sequelize_1.Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASS}`,
  {
    host: `${process.env.DB_HOST}`,
    dialect: "mariadb",
  }
);
/* Immediately Invoked Function Expression */
(() =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield sequelize.authenticate();
      yield Messages_1.default.sync({ alter: true });
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }))();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const http = require("http").Server(app);
const io = require("socket.io")(http);
app.get("/", (req, res) => {
  res.send("hello world");
});
http.listen(3001, function () {
  console.log("server running on port 3001");
  (0, messages_1.default)(app);
});
