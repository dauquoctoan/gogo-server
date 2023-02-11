"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const utils_1 = require("../utils");
const validation_1 = require("../validation");
const router = (0, express_1.Router)();
router.post('/image', (0, middleware_1.validate)(validation_1.JUpload), middleware_1.middleUpload.single('image'), (req, res) => {
    const proxyHost = req.headers['x-forwarded-host'];
    const host = proxyHost ? proxyHost : req.headers.host;
    const file_path = `http://${host + '/' + req.file.path}`;
    res.json((0, utils_1.handleResultSuccessNoPage)('Upload thành công', [
        file_path.replace(/\\/g, '/'),
    ]));
});
router.post('/images', (req, res) => { });
exports.default = router;
