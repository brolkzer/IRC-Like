"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = exports.getAllMessages = void 0;
const Messages_1 = __importDefault(require("../models/Messages"));
function getAllMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const messages = yield Messages_1.default.findAll({
                order: [["createdAt", "DESC"]],
            });
            if (messages) {
                res.status(200).json(messages);
            }
        }
        catch (error) {
            res
                .status(501)
                .send("Server couldn`t find messages from the database " + error);
        }
    });
}
exports.getAllMessages = getAllMessages;
function createMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const message = yield Messages_1.default.create({
                author: req.body.author,
                content: req.body.content,
            });
            if (message) {
                res.status(201).json("Message has been created :" + message);
            }
        }
        catch (error) {
            res.status(501).send("Message couldn`t be created " + error);
        }
    });
}
exports.createMessage = createMessage;
