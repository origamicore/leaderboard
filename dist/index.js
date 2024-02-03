"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardModel = exports.LeaderboardRouter = exports.LeaderboardConfig = void 0;
const Index_1 = __importDefault(require("./src/Index"));
const LeaderboardRouter_1 = __importDefault(require("./src/LeaderboardRouter"));
exports.LeaderboardRouter = LeaderboardRouter_1.default;
const BoardModel_1 = __importDefault(require("./src/models/BoardModel"));
exports.BoardModel = BoardModel_1.default;
const LeaderboardConfig_1 = __importDefault(require("./src/models/LeaderboardConfig"));
exports.LeaderboardConfig = LeaderboardConfig_1.default;
exports.default = Index_1.default;
//# sourceMappingURL=index.js.map