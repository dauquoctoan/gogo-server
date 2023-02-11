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
const Lesson_1 = __importDefault(require("../models/Lesson"));
const service_1 = require("../service");
const utils_1 = require("../utils");
const User_1 = __importDefault(require("../models/User"));
const Topic_1 = __importDefault(require("../models/Topic"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
class siteController {
    home(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('req.app.socketIo', req.app.socketIo)
            const socket = req.app.get('socketIo');
            yield socket.to('123').emit('receive_message', {
                room: '123',
                author: 'ngu',
                message: 'lol',
                time: new Date(Date.now()).getHours() +
                    ':' +
                    new Date(Date.now()).getMinutes(),
            });
            res.send('có cái nịt');
        });
    }
    randomLesson(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._FindsRandom)(Lesson_1.default, req.query, 'chủ đề', {
                path: 'part',
                populate: {
                    path: 'topic',
                },
            });
            res.json(result);
        });
    }
    upDatePoint(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const point = ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.type) * 100 || 0;
            const info = yield (0, service_1._Find)(User_1.default, { _id: req === null || req === void 0 ? void 0 : req.body._id }, 'user', false);
            const query = {
                _id: req === null || req === void 0 ? void 0 : req.body._id,
                point: (info === null || info === void 0 ? void 0 : info.point) + point || 0 + point,
            };
            const result = yield (0, service_1._FindByIdAndUpdate)(User_1.default, query, 'điểm');
            res.json(result);
        });
    }
    upDatePointWhenUnLock(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield (0, service_1._Find)(User_1.default, { _id: req === null || req === void 0 ? void 0 : req.body._id }, 'user', false);
            const point = ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.point) || 0;
            const query = {
                _id: req === null || req === void 0 ? void 0 : req.body._id,
                point: (info === null || info === void 0 ? void 0 : info.point) - point || 0,
            };
            const result = yield (0, service_1._FindByIdAndUpdate)(User_1.default, query, 'điểm');
            // res.json(result)
            res.send(info);
        });
    }
    upDateListCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._FindByIdAndUpdate)(User_1.default, { _id: req.body._id, $push: { listCourse: req.body.listCourse } }, 'khóa học');
            res.json(result);
        });
    }
    upDateListFriend(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._FindByIdAndUpdate)(User_1.default, { _id: req.body._id, $push: { listFriends: [(_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.friend] } }, 'bạn bè');
            res.json(result);
        });
    }
    getTop100(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._Finds)(User_1.default, Object.assign({}, req.query), 'top 100', null, true, { point: -1 });
            res.json(result);
        });
    }
    unlockTopic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result2 = yield (0, service_1._FindByIdAndUpdate)(Topic_1.default, req.body, 'topic');
            res.json(result2);
        });
    }
    getInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('=========================================================');
            console.log(req.query.token);
            console.log('=========================================================');
            var result = (0, jwt_decode_1.default)(req.query.token || '');
            console.log('=========================================================');
            console.log(result);
            console.log('=========================================================');
            if (!result) {
                res.json((0, utils_1.handleResultError)('Token không hợp lệ'));
            }
            const result2 = yield (0, service_1._Find)(User_1.default, { _id: result.id }, 'người dùng');
            console.log('=========================================================');
            console.log(result2);
            console.log('=========================================================');
            res.json(result2);
        });
    }
}
exports.default = new siteController();
