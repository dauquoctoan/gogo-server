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
exports.middleUpload = exports.validate = exports.middleAuthenTicationSocket = exports.middleAuthenTication = void 0;
const utils_1 = require("../utils");
const User = require('../models/User');
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const AdminUser_1 = __importDefault(require("../models/AdminUser"));
const service_1 = require("../service");
var multer = require('multer');
function middleAuthenTication(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (token) {
            try {
                var result = (0, jwt_decode_1.default)(token);
                let info = result.isLoginAdmin
                    ? yield AdminUser_1.default.findOne({ _id: result === null || result === void 0 ? void 0 : result.id })
                    : yield User.findOne({ email: result.email });
                if (info) {
                    req.id = info._id;
                    return next();
                }
                else {
                    res.status(400).json((0, utils_1.handleResultError)('Tài khoản không tồn tại'));
                }
            }
            catch (error) {
                return res.status(400).json((0, utils_1.handleResultError)('Lỗi xác thực'));
            }
        }
        else {
            return res.status(400).json((0, utils_1.handleResultError)('Vui lòng đăng nhập'));
        }
        next();
    });
}
exports.middleAuthenTication = middleAuthenTication;
function middleAuthenTicationSocket(socket, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = socket.request.headers.authorization;
        if (token) {
            try {
                var result = (0, jwt_decode_1.default)(token);
                let info = result.isLoginAdmin
                    ? yield AdminUser_1.default.findOne({ _id: result === null || result === void 0 ? void 0 : result.id })
                    : yield (0, service_1._Find)(User, { email: result.email }, 'user', false);
                if (info) {
                    return next();
                }
                else {
                    next(new Error('Socket authentication error'));
                }
            }
            catch (error) {
                return next(new Error('Socket authentication error'));
            }
        }
        else {
            return next(new Error('Socket authentication error'));
        }
    });
}
exports.middleAuthenTicationSocket = middleAuthenTicationSocket;
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(422).json((0, utils_1.handleResultError)(error.details[0].message));
    }
    else {
        next();
    }
};
exports.validate = validate;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    },
});
exports.middleUpload = multer({ storage: storage });
