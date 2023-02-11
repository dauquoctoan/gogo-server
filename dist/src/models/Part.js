"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Part = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: false },
    picture: { type: String, required: true },
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
    },
}, {
    timestamps: true,
});
exports.default = mongoose.model('Part', Part);
