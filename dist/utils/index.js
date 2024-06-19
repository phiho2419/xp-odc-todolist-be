"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
const apiResponse = ({ data, status, message, error, }) => {
    return {
        status: status || 500,
        data: data || undefined,
        error: error || undefined,
        message: message || "",
    };
};
exports.apiResponse = apiResponse;
