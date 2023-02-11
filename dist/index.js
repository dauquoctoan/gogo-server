"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const path = require('path');
require('dotenv').config();
var session = require('express-session');
const cors = require('cors');
const routes_1 = __importDefault(require("./src/routes"));
const index_1 = __importDefault(require("./src/configs/db/index"));
const socket_1 = __importDefault(require("./src/socket"));
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = __importStar(require("http"));
const socket_io_1 = require("socket.io");
const middleware_1 = require("./src/middleware");
const port = process.env.SERVER_PORT;
const app = express();
const httpServer = new http.Server(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3006'],
        credentials: true,
    },
});
app.set('socketIo', io);
// io.attach(httpServer, {
//     pingInterval: 5000, // 5s - đơn vị miliseconds 1000ms = 1s
//     pingTimeout: 20000, // 20s - đơn vị miliseconds 1000ms = 1s
//     cookie: false,
// })
io.use(middleware_1.middleAuthenTicationSocket);
index_1.default.connect();
app.use(cors());
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 20 * 60 * 1000,
    },
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
(0, routes_1.default)(app);
// const server = http.createServer(app)
(0, socket_1.default)(io);
httpServer.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
