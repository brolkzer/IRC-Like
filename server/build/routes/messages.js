"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../controllers/messages");
function messagesRoutes(app) {
    app.get("/api/messages", messages_1.getAllMessages);
    app.post("/api/postMessage", messages_1.createMessage);
}
exports.default = messagesRoutes;
