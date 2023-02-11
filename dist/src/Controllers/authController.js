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
const utils_1 = require("../utils");
const argon2_1 = __importDefault(require("argon2"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const constants_1 = require("../configs/constants");
const service_1 = require("../service");
const AdminUser_1 = __importDefault(require("../models/AdminUser"));
const user_1 = __importDefault(require("../models/user"));
var jwt = require('jsonwebtoken');
class authController {
    saveUserWithToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.body.token;
            if (token) {
                try {
                    const user = (0, jwt_decode_1.default)(token);
                    const data = {
                        name: user.name,
                        email: user.email,
                        email_verified: user.email_verified,
                        exp: user.exp,
                        givenName: user.givenName,
                        iat: user.iat,
                        picture: user.picture,
                        typeAccount: 1,
                    };
                    const result = yield (0, service_1._Create)(user_1.default, { email: data.email }, 'User', data);
                    return res.status(200).json(result);
                }
                catch (error) {
                    return res
                        .status(constants_1.STATUS_CODE.proxyAuthenticationRequired)
                        .json((0, utils_1.handleResultError)('Vui lòng đăng ký tài khoản!'));
                }
            }
            else {
                return res.json((0, utils_1.handleResultError)('Lỗi đăn ký tài khoản!'));
            }
        });
    }
    saveUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, age } = req.body;
            const hashPw = yield argon2_1.default.hash(password || '');
            const data = {
                age: age,
                name: name,
                email: email,
                typeAccount: 0,
                password: hashPw,
            };
            const result = yield (0, service_1._Create)(user_1.default, { email: email }, 'người dùng', data);
            res.json(result);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const info = yield user_1.default.findOne({ email: email });
                if (info._id &&
                    (yield argon2_1.default.verify(info === null || info === void 0 ? void 0 : info.password, password)) &&
                    (info === null || info === void 0 ? void 0 : info.typeAccount) === 0) {
                    const token = jwt.sign({ id: info._id, email: info.email }, process.env.JWT_PRIVATE_KEY);
                    const user = {
                        id: info._id,
                        email: info.email,
                        name: info.name,
                        token: token,
                        point: info.point,
                    };
                    return res.json((0, utils_1.handleResultSuccessNoPage)(utils_1.createMessage.loginSuccess('tài khoản'), user));
                }
                else {
                    return res.json((0, utils_1.handleResultError)(utils_1.createMessage.loginFail('tài khoản')));
                }
            }
            catch (error) {
                return res
                    .status(constants_1.STATUS_CODE.proxyAuthenticationRequired)
                    .json((0, utils_1.handleResultError)(utils_1.createMessage.loginFail('tài khoản')));
            }
        });
    }
    loginAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const info = yield AdminUser_1.default.findOne({ name: username });
                if (info._id && (yield argon2_1.default.verify(info === null || info === void 0 ? void 0 : info.password, password))) {
                    const token = jwt.sign({
                        id: info._id,
                        name: info.name,
                        role: info.role,
                        isLoginAdmin: true,
                    }, process.env.JWT_PRIVATE_KEY);
                    return res.json((0, utils_1.handleResultSuccessNoPage)(utils_1.createMessage.loginSuccess('tài khoản'), Object.assign(Object.assign({}, info._doc), { token: token })));
                }
                else {
                    return res.json((0, utils_1.handleResultError)('Tên tài khoản hặc mật khẩu không đúng!'));
                }
            }
            catch (error) {
                return res.json((0, utils_1.handleResultError)('Tên tài khoản hặc mật khẩu không đúng!'));
            }
        });
    }
    loginToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.body.token;
            if (token) {
                try {
                    const user = (0, jwt_decode_1.default)(token);
                    const info = yield user_1.default.findOne({ email: user.email });
                    const info_token = jwt.sign({
                        id: info._id,
                        name: info.name,
                        email: info.email,
                        point: (info === null || info === void 0 ? void 0 : info.point) || 0,
                    }, process.env.JWT_PRIVATE_KEY);
                    return res.status(200).json((0, utils_1.handleResultSuccessNoPage)('login thành công', {
                        id: info._id,
                        name: info.name,
                        email: info.email,
                        picture: info.picture,
                        token: info_token,
                        point: (info === null || info === void 0 ? void 0 : info.point) || 0,
                    }));
                }
                catch (error) {
                    return res
                        .status(400)
                        .json((0, utils_1.handleResultError)('Vui lòng đăng ký tài khoản!'));
                }
            }
            else {
                return res.status(400).json((0, utils_1.handleResultError)('Lỗi đăng nhập'));
            }
        });
    }
}
exports.default = new authController();
