"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../../Controllers/adminController"));
const lessonController_1 = __importDefault(require("../../Controllers/lessonController"));
const middleware_1 = require("../../middleware");
const validation_1 = require("../../validation");
const router = (0, express_1.Router)();
/* topic */
router.get('/topics', lessonController_1.default.getTopics);
router.post('/topic', (0, middleware_1.validate)(validation_1.JCreateTopic), lessonController_1.default.createTopic);
router.put('/topic', (0, middleware_1.validate)(validation_1.JCreateTopic), lessonController_1.default.updateTopic);
router.delete('/topic', (0, middleware_1.validate)(validation_1.JDelete), lessonController_1.default.deleteTopic);
/* lesson */
router.get('/lessons', lessonController_1.default.getLesson);
router.post('/lesson', (0, middleware_1.validate)(validation_1.JCreateLesson), lessonController_1.default.createLesson);
router.put('/lesson', (0, middleware_1.validate)(validation_1.JUpdateLesson), lessonController_1.default.upadateLesson);
router.delete('/lesson', (0, middleware_1.validate)(validation_1.JDelete), lessonController_1.default.deleteLesson);
/* part */
router.get('/parts', lessonController_1.default.getParts);
router.post('/part', (0, middleware_1.validate)(validation_1.JCreatePart), lessonController_1.default.createPart);
router.put('/part', (0, middleware_1.validate)(validation_1.JUpdatePart), lessonController_1.default.updatePart);
router.delete('/part', (0, middleware_1.validate)(validation_1.JDelete), lessonController_1.default.deletePart);
/* user */
router.get('/users', lessonController_1.default.getUsers);
router.get('/a-users', adminController_1.default.getAUsers);
router.post('/a-user', (0, middleware_1.validate)(validation_1.JCreateAUser), adminController_1.default.createAUser);
router.put('/a-user', (0, middleware_1.validate)(validation_1.JUpdateAUser), adminController_1.default.updateAUser);
router.patch('/a-user', (0, middleware_1.validate)(validation_1.JChangeStatusAUser), adminController_1.default.updateAUser);
router.delete('/a-user', (0, middleware_1.validate)(validation_1.JDelete), adminController_1.default.deleteAUser);
/* age group */
router.get('/age-groups', lessonController_1.default.getParts);
router.post('/age-group', (0, middleware_1.validate)(validation_1.JCreatePart), lessonController_1.default.createPart);
router.put('/age-group', (0, middleware_1.validate)(validation_1.JUpdatePart), lessonController_1.default.updatePart);
router.delete('/age-group', (0, middleware_1.validate)(validation_1.JDelete), lessonController_1.default.deletePart);
router.get('/event-news', lessonController_1.default.getEventNews);
router.post('/event-news', (0, middleware_1.validate)(validation_1.JCreateEventNews), lessonController_1.default.createEventNews);
router.put('/event-news', (0, middleware_1.validate)(validation_1.JUpdateEventNews), lessonController_1.default.updateEventNews);
router.delete('/event-news', (0, middleware_1.validate)(validation_1.JDelete), lessonController_1.default.deleteEventNews);
/* age course */
router.get('/courses', lessonController_1.default.getCourses);
router.post('/course', (0, middleware_1.validate)(validation_1.JCreateCourse), lessonController_1.default.createCourse);
router.put('/course', (0, middleware_1.validate)(validation_1.JUpdateCourse), lessonController_1.default.updateCourse);
router.delete('/course', (0, middleware_1.validate)(validation_1.JDelete), lessonController_1.default.deleteCourse);
/* age course */
router.get('/homes', lessonController_1.default.getHome);
exports.default = router;
