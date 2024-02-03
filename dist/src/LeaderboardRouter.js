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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@origamicore/core");
const BoardModel_1 = __importDefault(require("./models/BoardModel"));
class LeaderboardRouter {
    static addScore(gameId, score, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield core_1.Router.runInternal('leaderboard', 'addScore', new core_1.MessageModel({ data: {
                    gameId, score, userid
                } }));
            return parseFloat(response.response.data);
        });
    }
    static setScore(gameId, score, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield core_1.Router.runInternal('leaderboard', 'setScore', new core_1.MessageModel({ data: {
                    gameId, score, userid
                } }));
            return !!response.response.data;
        });
    }
    static removeScore(gameId, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield core_1.Router.runInternal('leaderboard', 'removeScore', new core_1.MessageModel({ data: {
                    gameId, userid
                } }));
            return !!response.response.data;
        });
    }
    static getScore(gameId, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield core_1.Router.runInternal('leaderboard', 'getScore', new core_1.MessageModel({ data: {
                    gameId, userid
                } }));
            if (!response.response.data)
                return false;
            return parseFloat(response.response.data);
        });
    }
    static getCount(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield core_1.Router.runInternal('leaderboard', 'getCount', new core_1.MessageModel({ data: {
                    gameId
                } }));
            return response.response.data;
        });
    }
    static getRange(gameId, begin, end, isReverse = false) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield core_1.Router.runInternal('leaderboard', 'getRange', new core_1.MessageModel({ data: {
                    gameId, begin, end, isReverse
                } }));
            return response.response.data;
        });
    }
    static getTop(gameId, top) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield core_1.Router.runInternal('leaderboard', 'getTop', new core_1.MessageModel({ data: {
                    gameId,
                    top: top - 1
                } }));
            var arr = [];
            for (var a of response.response.data)
                arr.push(new BoardModel_1.default(a));
            return arr;
        });
    }
    static updateUser(userid, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield core_1.Router.runInternal('leaderboard', 'updateUser', new core_1.MessageModel({ data: {
                    userid, value
                } }));
            return response.response.data == 'OK';
        });
    }
    static removeGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield core_1.Router.runInternal('leaderboard', 'removeGame', new core_1.MessageModel({ data: {
                    gameId
                } }));
            return !!response.response.data;
        });
    }
    static getBoard(gameId, userid, count, top = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield core_1.Router.runInternal('leaderboard', 'getBoard', new core_1.MessageModel({ data: {
                    gameId,
                    userid,
                    count,
                    top: top - 1
                } }));
            var arr = [];
            for (var a of response.response.data)
                arr.push(new BoardModel_1.default(a));
            return arr;
        });
    }
}
exports.default = LeaderboardRouter;
//# sourceMappingURL=LeaderboardRouter.js.map