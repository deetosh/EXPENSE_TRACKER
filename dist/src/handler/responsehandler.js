"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setResponse = exports.responseClearCookieHandler = exports.responseCookieHandler = exports.responseHandler = void 0;
const responseHandler = (res, status, isError, msg, data) => {
    let responseObject = {
        "error": isError,
        "message": msg,
        "data": data
    };
    return res.status(status).send(responseObject);
};
exports.responseHandler = responseHandler;
const responseCookieHandler = (res, status, isError, msg, cookie_data, data) => {
    let responseObject = {
        "error": isError,
        "message": msg,
        "data": data
    };
    const cookie_options = {
        httpOnly: true,
        secure: true,
    };
    cookie_data.forEach((cookie) => {
        res.cookie(cookie.name, cookie.value, cookie_options);
    });
    return res.status(status).send(responseObject);
};
exports.responseCookieHandler = responseCookieHandler;
const responseClearCookieHandler = (res, status, isError, msg, cookie_data, data) => {
    let responseObject = {
        "error": isError,
        "message": msg,
        "data": data
    };
    const cookie_options = {
        httpOnly: true,
        secure: true,
    };
    cookie_data.forEach((cookie) => {
        res.clearCookie(cookie.name, cookie_options);
    });
    return res.status(status).send(responseObject);
};
exports.responseClearCookieHandler = responseClearCookieHandler;
const setResponse = (response, statusCode, isError, message, data, cookie_data) => {
    response['statusCode'] = statusCode;
    response['message'] = message;
    response['isError'] = isError;
    response['data'] = data;
    if (cookie_data) {
        response['cookie_data'] = cookie_data;
    }
    return response;
};
exports.setResponse = setResponse;
