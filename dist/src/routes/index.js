"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./admin/index"));
const index_2 = __importDefault(require("./site/index"));
const auth_1 = __importDefault(require("./auth"));
const upload_1 = __importDefault(require("./upload"));
function router(app) {
    app.use('/upload', upload_1.default);
    app.use('/site', index_2.default);
    app.use('/', auth_1.default);
    app.use('/admin', index_1.default);
}
exports.default = router;
