"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeStampMilliSecond = exports.getTimeStampSecond = void 0;
const getTimeStampSecond = () => Date.now() / 1000;
exports.getTimeStampSecond = getTimeStampSecond;
const getTimeStampMilliSecond = () => Date.now();
exports.getTimeStampMilliSecond = getTimeStampMilliSecond;
