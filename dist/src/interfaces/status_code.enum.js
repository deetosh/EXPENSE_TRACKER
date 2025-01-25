"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eStatusCode = void 0;
var eStatusCode;
(function (eStatusCode) {
    eStatusCode[eStatusCode["OK"] = 200] = "OK";
    eStatusCode[eStatusCode["CREATED"] = 201] = "CREATED";
    eStatusCode[eStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    eStatusCode[eStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    eStatusCode[eStatusCode["CLIENT_INPUT_ERROR"] = 402] = "CLIENT_INPUT_ERROR";
    eStatusCode[eStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    eStatusCode[eStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    eStatusCode[eStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    eStatusCode[eStatusCode["OTHER_SERVER_ERROR"] = 502] = "OTHER_SERVER_ERROR";
})(eStatusCode || (exports.eStatusCode = eStatusCode = {}));
