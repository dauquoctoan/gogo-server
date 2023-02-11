"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lessonController_1 = __importDefault(require("../../Controllers/lessonController"));
const siteController_1 = __importDefault(require("../../Controllers/siteController"));
const middleware_1 = require("../../middleware");
const validation_1 = require("../../validation");
const router = (0, express_1.Router)();
router.get('/', siteController_1.default.home);
router.get('/topics', lessonController_1.default.getTopics);
router.get('/parts', lessonController_1.default.getParts);
router.get('/lessons', lessonController_1.default.getLesson);
router.put('/user', (0, middleware_1.validate)(validation_1.JUpdatePoint), siteController_1.default.upDatePoint);
router.put('/user-order', (0, middleware_1.validate)(validation_1.JUpdateCourseUser), siteController_1.default.upDateListCourse);
router.put('/update-list-friend', 
// validate(JUpdateCourseUser),
siteController_1.default.upDateListFriend);
router.put('/update-point-when-unlock', siteController_1.default.upDatePointWhenUnLock);
router.get('/random-lessons', lessonController_1.default.getRandom);
router.get('/news-event', lessonController_1.default.getEventNews);
router.get('/courses', lessonController_1.default.getCourses);
router.get('/top100', siteController_1.default.getTop100);
router.put('/unlock-topic', siteController_1.default.unlockTopic);
router.get('/get-info', siteController_1.default.getInfo);
exports.default = router;
