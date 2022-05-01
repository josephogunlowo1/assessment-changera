"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const log_1 = __importDefault(require("./log"));
const logStream = {
    write: (message) => log_1.default.info(message),
};
const log = morgan_1.default("dev", { stream: logStream });
exports.default = log;
//# sourceMappingURL=morgan.js.map