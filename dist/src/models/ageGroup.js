"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AgeGroup = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    age: { type: Number, required: false },
}, {
    timestamps: true,
});
exports.default = mongoose.model('ageGroup', AgeGroup);
