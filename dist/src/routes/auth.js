"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../Controllers/authController"));
const middleware_1 = require("../middleware");
const validation_1 = require("../validation");
const router = (0, express_1.Router)();
router.post('/save-user-with-token', (0, middleware_1.validate)(validation_1.JCreateUserWithToken), authController_1.default.saveUserWithToken);
router.post('/save-user', (0, middleware_1.validate)(validation_1.JCreateUser), authController_1.default.saveUser);
router.post('/login', authController_1.default.login);
router.post('/login-token', authController_1.default.loginToken);
router.post('/admin/login', (0, middleware_1.validate)(validation_1.JLoginAdmin), authController_1.default.loginAdmin);
exports.default = router;
