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
const Lesson_2 = __importDefault(require("../models/Lesson"));
const Topic_1 = __importDefault(require("../models/Topic"));
const Part_1 = __importDefault(require("../models/Part"));
const EventNews_1 = __importDefault(require("../models/EventNews"));
const Course_1 = __importDefault(require("../models/Course"));
const service_1 = require("../service");
const utils_1 = require("../utils");
const User_1 = __importDefault(require("../models/User"));
class lessonController {
    createCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._Creates)(Lesson_2.default, req.body, 'card');
            res.json(result);
        });
    }
    //topic
    getTopics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._Finds)(Topic_1.default, Object.assign(Object.assign({}, (0, utils_1.handleSearchMongoose)('name', req.query.search || '')), req.query), 'topic');
            res.json(result);
        });
    }
    createTopic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._Creates)(Topic_1.default, req.body, 'chủ đề');
            res.json(result);
        });
    }
    updateTopic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._FindByIdAndUpdate)(Topic_1.default, req.body, 'chủ đề');
            res.json(result);
        });
    }
    deleteTopic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._FindByIdAndDelete)(Topic_1.default, req === null || req === void 0 ? void 0 : req.body, 'chủ đề');
            res.json(result);
        });
    }
    createLesson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._Creates)(Lesson_1.default, req === null || req === void 0 ? void 0 : req.body, 'bài tập');
            res.json(result);
        });
    }
    upadateLesson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._FindByIdAndUpdate)(Lesson_1.default, req === null || req === void 0 ? void 0 : req.body, 'bài tập');
            res.json(result);
        });
    }
    deleteLesson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._FindByIdAndDelete)(Lesson_1.default, req === null || req === void 0 ? void 0 : req.body, 'bài tập');
            res.json(result);
        });
    }
    getLesson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._Finds)(Lesson_1.default, Object.assign(Object.assign({}, (0, utils_1.handleSearchMongoose)('title', req.query.search || '')), req.query), 'chủ đề', {
                path: 'part',
                populate: {
                    path: 'topic',
                    populate: {
                        path: 'course',
                    },
                },
            });
            res.json(result);
        });
    }
    getRandom(req, res) {
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
    getParts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._Finds)(Part_1.default, Object.assign(Object.assign({}, (0, utils_1.handleSearchMongoose)('title', req.query.search || '')), req.query), 'học phần', 'topic');
            res.json(result);
        });
    }
    createPart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._Creates)(Part_1.default, req === null || req === void 0 ? void 0 : req.body, 'học phần');
            res.json(result);
        });
    }
    updatePart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._FindByIdAndUpdate)(Part_1.default, req === null || req === void 0 ? void 0 : req.body, 'học phần');
            res.json(result);
        });
    }
    deletePart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._FindByIdAndDelete)(Part_1.default, req === null || req === void 0 ? void 0 : req.body, 'học phần');
            res.json(result);
        });
    }
    /* user */
    getUsers(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._Finds)(User_1.default, Object.assign(Object.assign({}, (0, utils_1.handleSearchMongoose)('name', ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.search) || '')), req.query), 'Người dùng');
            res.json(result);
        });
    }
    createEventNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._Creates)(EventNews_1.default, req === null || req === void 0 ? void 0 : req.body, 'tin tức sự kiện');
            res.json(result);
        });
    }
    updateEventNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._FindByIdAndUpdate)(EventNews_1.default, req === null || req === void 0 ? void 0 : req.body, 'tin tức sự kiện');
            res.json(result);
        });
    }
    deleteEventNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._FindByIdAndDelete)(EventNews_1.default, req === null || req === void 0 ? void 0 : req.body, 'tin tức sự kiện');
            res.json(result);
        });
    }
    /* user */
    getEventNews(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._Finds)(EventNews_1.default, Object.assign(Object.assign({}, (0, utils_1.handleSearchMongoose)('title', ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.search) || '')), req.query), 'tin tức sự kiện');
            res.json(result);
        });
    }
    getHome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.count();
            const eventNews = yield EventNews_1.default.count();
            const course = yield Course_1.default.count();
            res.json((0, utils_1.handleResultSuccessNoPage)('Thành công', { user, eventNews, course }));
        });
    }
    /* course */
    getCourses(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._Finds)(Course_1.default, Object.assign(Object.assign({}, (0, utils_1.handleSearchMongoose)('title', ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.search) || '')), req.query), 'Người dùng');
            res.json(result);
        });
    }
    createCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._Creates)(Course_1.default, req === null || req === void 0 ? void 0 : req.body, 'khóa học');
            res.json(result);
        });
    }
    updateCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._FindByIdAndUpdate)(Course_1.default, req === null || req === void 0 ? void 0 : req.body, 'khóa học');
            res.json(result);
        });
    }
    deleteCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, service_1._FindByIdAndDelete)(Course_1.default, req === null || req === void 0 ? void 0 : req.body, 'khóa học');
            res.json(result);
        });
    }
}
exports.default = new lessonController();
