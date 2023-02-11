"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Sort = new Schema({
    title: { type: String, required: true },
    data: { type: Array, required: true },
    picture: { type: String, required: false },
}, {
    timestamps: true,
});
exports.default = mongoose.model('sorts', Sort);
