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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await mongoose.connect(process.env.ACCESS_DB, {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            //     useCreateIndex: true,
            //     useFindAndModify: false,
            // })
            yield mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@leaning-app.zvik9qk.mongodb.net/learning_app?useNewUrlParser=true&useUnifiedTopology=true&useCreateIndex=true&useFindAndModify=false`);
            console.log('Connect db successfully!!!');
        }
        catch (error) {
            console.log('Connect db failure!!!');
        }
    });
}
exports.default = { connect };
