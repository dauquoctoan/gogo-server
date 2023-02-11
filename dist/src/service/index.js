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
exports._FindsRandom = exports._FindByIdAndUpdate = exports._FindByIdAndDelete = exports._Find = exports._Finds = exports._Creates = exports._Create = void 0;
const constants_1 = require("../configs/constants");
const utils_1 = require("../utils");
function _Create(modal, query, name = 'đối tượng', data) {
    return __awaiter(this, void 0, void 0, function* () {
        const oldModal = yield modal.find(query);
        if ((oldModal === null || oldModal === void 0 ? void 0 : oldModal.length) > 0) {
            return (0, utils_1.handleResultError)(utils_1.createMessage.createFailExist(name));
        }
        const db = new modal(data);
        try {
            const modal = yield db.save();
            return (0, utils_1.handleResultSuccessNoPage)(utils_1.createMessage.createSuccess(name), Object.assign({}, modal._doc));
        }
        catch (error) {
            return (0, utils_1.handleResultError)(utils_1.createMessage.createFail(name));
        }
    });
}
exports._Create = _Create;
function _Creates(modal, data, name = 'đối tượng') {
    return __awaiter(this, void 0, void 0, function* () {
        const db = new modal(data);
        try {
            const modal = yield db.save();
            return (0, utils_1.handleResultSuccessNoPage)(utils_1.createMessage.createSuccess(name), Object.assign({}, modal._doc));
        }
        catch (error) {
            return (0, utils_1.handleResultError)(utils_1.createMessage.createFail(name));
        }
    });
}
exports._Creates = _Creates;
function _Finds(modal, query, name = 'đối tượng', populate = null, isRes = true, sort = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        query = (0, utils_1.handleRemoveKeysNull)(query);
        const paging = {
            page: Number(query.page) || constants_1.DEFAULT_PAGE.page,
            limit: Number(query.limit) || constants_1.DEFAULT_PAGE.limit,
        };
        delete query['page'];
        delete query['limit'];
        delete query['search'];
        const skip = (paging.page - 1) * paging.limit;
        try {
            const modals = yield modal
                .find(query)
                .skip(skip)
                .limit(paging.limit)
                .populate(populate)
                .sort(sort);
            if (modals) {
                const total = yield modal.countDocuments();
                return isRes
                    ? (0, utils_1.handleResultSuccess)(utils_1.createMessage.findSuccess(name), modals, Object.assign(Object.assign({}, paging), { total: total }))
                    : modals;
            }
        }
        catch (error) {
            return (0, utils_1.handleResultError)(utils_1.createMessage.findFail(name) + ':' + error);
        }
    });
}
exports._Finds = _Finds;
function _Find(modal, query, name, isRes = true) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const modals = yield modal.findOne(query);
            if (modals) {
                return isRes
                    ? (0, utils_1.handleResultSuccessNoPage)(utils_1.createMessage.findSuccess('name'), modals === null || modals === void 0 ? void 0 : modals._doc)
                    : modals === null || modals === void 0 ? void 0 : modals._doc;
            }
        }
        catch (error) {
            return (0, utils_1.handleResultError)(utils_1.createMessage.findFail(name));
        }
    });
}
exports._Find = _Find;
function _FindByIdAndDelete(modal, query, name, isRes = true) {
    return __awaiter(this, void 0, void 0, function* () {
        return modal
            .findByIdAndDelete({ _id: query._id })
            .then((result) => {
            if (result) {
                return isRes
                    ? (0, utils_1.handleResultSuccessNoPage)(utils_1.createMessage.deleteSuccess(name), result)
                    : result;
            }
            else {
                return (0, utils_1.handleResultError)(utils_1.createMessage.findFail(name));
            }
        })
            .catch((error) => {
            console.log(error);
            return (0, utils_1.handleResultError)(utils_1.createMessage.deleteFail(name));
        });
    });
}
exports._FindByIdAndDelete = _FindByIdAndDelete;
function _FindByIdAndUpdate(modal, query, name, isRes = true) {
    return __awaiter(this, void 0, void 0, function* () {
        const _id = query._id;
        delete query['_id'];
        return modal
            .findByIdAndUpdate(_id, query)
            .then((result) => {
            if (result) {
                return isRes
                    ? (0, utils_1.handleResultSuccessNoPage)(utils_1.createMessage.updateSuccess(name), result)
                    : result;
            }
            else {
                return (0, utils_1.handleResultError)('Không tìm thấy user');
            }
        })
            .catch((error) => {
            console.log(error);
            return (0, utils_1.handleResultError)(utils_1.createMessage.updateFail(error));
        });
    });
}
exports._FindByIdAndUpdate = _FindByIdAndUpdate;
function _FindsRandom(modal, query, name = 'đối tượng', populate = null, isRes = true) {
    return __awaiter(this, void 0, void 0, function* () {
        query = (0, utils_1.handleRemoveKeysNull)(query);
        const paging = {
            page: Number(query.page) || constants_1.DEFAULT_PAGE.page,
            limit: Number(query.limit) || 10,
        };
        delete query['page'];
        delete query['limit'];
        delete query['search'];
        try {
            const total = yield modal.count();
            var random = Math.floor(Math.random() * (total - paging.limit));
            random = random < 0 ? 0 : random;
            const result = yield modal.find(query).skip(random).populate(populate);
            return isRes
                ? (0, utils_1.handleResultSuccess)(utils_1.createMessage.findSuccess(name), result, Object.assign(Object.assign({}, paging), { total: total }))
                : result;
        }
        catch (error) {
            return (0, utils_1.handleResultError)(utils_1.createMessage.findFail(name) + ':' + error);
        }
    });
}
exports._FindsRandom = _FindsRandom;
