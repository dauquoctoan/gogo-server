"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRemoveKeysNull = exports.handleSearchMongoose = exports.createMessage = exports.handleResultError = exports.handleResultSuccess = exports.handleResultSuccessNoPage = void 0;
const constants_1 = require("../configs/constants");
function handleResultSuccessNoPage(message, data) {
    return {
        code: 1,
        data: data,
        message: message,
    };
}
exports.handleResultSuccessNoPage = handleResultSuccessNoPage;
function handleResultSuccess(message, data, paging = {
    limit: 24,
    index: 1,
    total: 1,
}) {
    return {
        code: 1,
        data: data,
        message: message,
        paging: paging,
    };
}
exports.handleResultSuccess = handleResultSuccess;
function handleResultError(message) {
    return {
        code: 0,
        message: message,
    };
}
exports.handleResultError = handleResultError;
function defaultCreateSuccess(name) {
    return `${constants_1.STRINGS.METHOD.CREATE} ${name} ${constants_1.STRINGS.STATUS.SUCCESS}`;
}
function defaultCreateFail(name) {
    return `${constants_1.STRINGS.METHOD.CREATE} ${name} ${constants_1.STRINGS.STATUS.FAIL}`;
}
function defaultCreateFailExist(name) {
    return `${constants_1.STRINGS.WARN.EXIST} ${name}`;
}
function defaultUpdateSuccess(name) {
    return `${constants_1.STRINGS.METHOD.UPDATE} ${name} ${constants_1.STRINGS.STATUS.SUCCESS}`;
}
function defaultUpdateFail(name) {
    return `${constants_1.STRINGS.METHOD.UPDATE} ${name} ${constants_1.STRINGS.STATUS.FAIL}`;
}
function defaultDeleteSuccess(name) {
    return `${constants_1.STRINGS.METHOD.DELETE} ${name} ${constants_1.STRINGS.STATUS.SUCCESS}`;
}
function defaultDeleteFail(name) {
    return `${constants_1.STRINGS.METHOD.DELETE} ${name} ${constants_1.STRINGS.STATUS.FAIL}`;
}
function defaultFindSuccess(name) {
    return `${constants_1.STRINGS.METHOD.FIND} ${name} ${constants_1.STRINGS.STATUS.SUCCESS}`;
}
function defaultFindFail(name) {
    return `${constants_1.STRINGS.METHOD.FIND} ${name} ${constants_1.STRINGS.STATUS.FAIL}`;
}
function defaultLoginSuccess(name) {
    return `${constants_1.STRINGS.METHOD.LOGIN} ${name} ${constants_1.STRINGS.STATUS.SUCCESS}`;
}
function defaultLoginFail(name) {
    return `${constants_1.STRINGS.METHOD.LOGIN} ${name} ${constants_1.STRINGS.STATUS.FAIL}`;
}
exports.createMessage = {
    createSuccess: (name) => {
        return defaultCreateSuccess(name);
    },
    createFail: (name) => {
        return defaultCreateFail(name);
    },
    createFailExist: (name) => {
        return defaultCreateFailExist(name);
    },
    updateSuccess: (name) => {
        return defaultUpdateSuccess(name);
    },
    updateFail: (name) => {
        return defaultUpdateFail(name);
    },
    deleteSuccess: (name) => {
        return defaultDeleteSuccess(name);
    },
    deleteFail: (name) => {
        return defaultDeleteFail(name);
    },
    findSuccess: (name) => {
        return defaultFindSuccess(name);
    },
    findFail: (name) => {
        return defaultFindFail(name);
    },
    loginSuccess: (name) => {
        return defaultLoginSuccess(name);
    },
    loginFail: (name) => {
        return defaultLoginFail(name);
    },
};
const handleSearchMongoose = (name, search) => {
    return {
        [name]: { $regex: '.*' + search + '.*', $options: 'i' },
    };
};
exports.handleSearchMongoose = handleSearchMongoose;
const handleRemoveKeysNull = (query) => {
    Object.keys(query).forEach(element => {
        if (!query[element]) {
            delete query[element];
        }
    });
    return query;
};
exports.handleRemoveKeysNull = handleRemoveKeysNull;
