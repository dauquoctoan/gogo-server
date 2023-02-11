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
const service_1 = require("../service");
const argon2_1 = __importDefault(require("argon2"));
const AdminUser_1 = __importDefault(require("../models/AdminUser"));
const utils_1 = require("../utils");
class adminController {
    getAUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._Finds)(AdminUser_1.default, Object.assign(Object.assign({}, (0, utils_1.handleSearchMongoose)('name', req.query.search || '')), req.query), 'quản trị');
            res.json(result);
        });
    }
    createAUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const hashPw = yield argon2_1.default.hash(((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.password) || '');
            const result = yield (0, service_1._Creates)(AdminUser_1.default, Object.assign(Object.assign({}, req === null || req === void 0 ? void 0 : req.body), { password: hashPw }), 'quản trị');
            res.json(result);
        });
    }
    updateAUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._FindByIdAndUpdate)(AdminUser_1.default, req === null || req === void 0 ? void 0 : req.body, 'quản trị');
            res.json(result);
        });
    }
    deleteAUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._FindByIdAndDelete)(AdminUser_1.default, req === null || req === void 0 ? void 0 : req.body, 'quản trị');
            res.json(result);
        });
    }
}
exports.default = new adminController();
