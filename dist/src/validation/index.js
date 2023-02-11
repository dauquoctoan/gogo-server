"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JUpdateCourse = exports.JCreateCourse = exports.JUpdatePoint = exports.JUpdateTop = exports.JCreateTop = exports.JUpdateEventNews = exports.JCreateEventNews = exports.JLoginAdmin = exports.JChangeStatusAUser = exports.JUpdateAUser = exports.JCreateAUser = exports.JUpdatePart = exports.JCreatePart = exports.JUploads = exports.JUpload = exports.JDelete = exports.JUpdateTopic = exports.JCreateTopic = exports.JUpdateLesson = exports.JCreateLesson = exports.JUpdateUser = exports.JCreateUserWithToken = exports.JCreateUser = void 0;
const Joi = require('joi');
const _userName = Joi.string().alphanum().min(3).max(30);
const _email = Joi.string().email();
const _password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const _token = Joi.string().token();
const _birth_year = Joi.string();
exports.JCreateUser = Joi.object({
    name: _userName.required(),
    age: Joi.string().required(),
    email: _email.required(),
    picture: Joi.string(),
    givenName: _userName,
    typeAccount: Joi.number(),
    iat: Joi.string(),
    exp: Joi.string(),
    email_verified: Joi.string(),
    password: _password.required(),
    listCourse: Joi.array(),
});
exports.JCreateUserWithToken = Joi.object({
    token: Joi.string().required(),
});
exports.JUpdateUser = Joi.object({
    _id: Joi.string().required(),
    name: _userName.required(),
    email: _email.required(),
    picture: Joi.string(),
    givenName: _userName,
    typeAccount: Joi.number().required(),
    iat: Joi.string(),
    exp: Joi.string(),
    email_verified: Joi.string(),
    password: _password.required(),
    age: Joi.string().required(),
    listCourse: Joi.array(),
});
exports.JCreateLesson = Joi.object({
    title: Joi.string().required(),
    type: Joi.string().required(),
    audio: Joi.string(),
    picture: Joi.string(),
    options: Joi.array().required(),
    answer: Joi.number(),
    answers: Joi.array(),
    status: Joi.string(),
    level: Joi.number().required(),
    // topic: Joi.string().required(),
    part: Joi.string().required(),
    _id: Joi.string(),
});
exports.JUpdateLesson = Joi.object({
    title: Joi.string().required(),
    audio: Joi.string(),
    picture: Joi.string(),
    type: Joi.string().required(),
    options: Joi.array().required(),
    answer: Joi.number(),
    answers: Joi.array(),
    status: Joi.string(),
    level: Joi.number().required(),
    part: Joi.string().required(),
    _id: Joi.string().required(),
});
exports.JCreateTopic = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required(),
    desc: Joi.string(),
    ageGroup: Joi.string().required(),
    picture: Joi.string(),
    course: Joi.string(),
});
exports.JUpdateTopic = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    desc: Joi.string(),
    ageGroup: Joi.string().required(),
    picture: Joi.string().required(),
});
exports.JDelete = Joi.object({
    _id: Joi.string().required(),
});
exports.JUpload = Joi.object({
    'Form Data': Joi.object({
        image: Joi.binary().required(),
    }),
});
exports.JUploads = Joi.object({
    'Form Data': Joi.object({
        images: Joi.binary().required(),
    }).required(),
});
exports.JCreatePart = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string(),
    picture: Joi.string().required(),
    topic: Joi.string().required(),
});
exports.JUpdatePart = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().required(),
    desc: Joi.string(),
    picture: Joi.string().required(),
    topic: Joi.string().required(),
});
exports.JCreateAUser = Joi.object({
    name: Joi.string().required(),
    email: _email,
    age: Joi.number(),
    picture: Joi.string(),
    password: Joi.string().required(),
    status: Joi.string(),
    role: Joi.string().required(),
});
exports.JUpdateAUser = Joi.object({
    _id: Joi.string().required(),
    name: _userName.required(),
    email: _email,
    age: Joi.number(),
    picture: Joi.string(),
    password: Joi.string(),
    status: Joi.string(),
    role: Joi.string().required(),
});
exports.JChangeStatusAUser = Joi.object({
    _id: Joi.string().required(),
    status: Joi.string().required(),
});
exports.JLoginAdmin = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});
exports.JCreateEventNews = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    picture: Joi.string().required(),
    link: Joi.string().required(),
});
exports.JUpdateEventNews = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
    picture: Joi.string().required(),
    link: Joi.string().required(),
});
exports.JCreateTop = Joi.object({
    point: Joi.string().required(),
    user: Joi.string().required(),
});
exports.JUpdateTop = Joi.object({
    _id: Joi.string().required(),
    point: Joi.string().required(),
    user: Joi.string().required(),
});
exports.JUpdatePoint = Joi.object({
    _id: Joi.string().required(),
    type: Joi.number(),
    listCourse: Joi.array(),
});
exports.JCreateCourse = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    picture: Joi.string(),
    price: Joi.number(),
    topic: Joi.string(),
    user: Joi.string().required()
});
exports.JUpdateCourse = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
    picture: Joi.string(),
    price: Joi.number(),
    topic: Joi.string(),
    user: Joi.string().required()
});
