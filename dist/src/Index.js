"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const core_1 = require("@origamicore/core");
var redis = require("redis");
let TsOriLeaderboard = class TsOriLeaderboard {
    constructor() {
        this.name = 'leaderboard';
    }
    jsonConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.config = config;
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = redis.createClient(this.config.port, this.config.host);
            yield this.connection.connect();
            console.log('Leaderboard -> redis connected ' + this.config.host);
            yield this.connection.select(this.config.db);
            console.log('Leaderboard -> redis on db : ' + this.config.db);
        });
    }
    restart() {
        throw new Error('Method not implemented.');
    }
    stop() {
        throw new Error('Method not implemented.');
    }
    addScore(gameId, score, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = yield this.connection.sendCommand(['zincrby', gameId, score.toString(), userid]);
            return core_1.RouteResponse.success(data);
        });
    }
    getScore(gameId, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = yield this.connection.sendCommand(['zscore', gameId, userid]);
            return core_1.RouteResponse.success(data);
        });
    }
    setScore(gameId, score, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = yield this.connection.sendCommand(['zadd', gameId, score.toString(), userid]);
            return core_1.RouteResponse.success(data);
        });
    }
    removeScore(gameId, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = yield this.connection.sendCommand(['zrem', gameId, userid]);
            return core_1.RouteResponse.success(data);
        });
    }
    getBoard(gameId, userid, count, top) {
        return __awaiter(this, void 0, void 0, function* () {
            let topborad = [];
            if (top > -1) {
                var topdata = yield this.connection.sendCommand(['zrevrange', gameId, '0', top.toString(), 'withscores']);
                topborad = yield this.convertUser(topdata);
            }
            if (!topborad.filter(p => p.name == userid)[0]) {
                var val = yield this.connection.sendCommand(['zrevrank', gameId, userid]);
                var begin = val - count;
                var end = val + count;
                if (begin < 0)
                    begin = 0;
                var data = yield this.connection.sendCommand(['zrevrange', gameId, begin.toString(), end.toString(), 'withscores']);
                let board = yield this.convertUser(data);
                for (var a = 0; a < board.length; a++) {
                    board[a].rank = begin + a;
                    if (!topborad.filter(p => p.name == board[a].name)[0]) {
                        topborad.push(board[a]);
                    }
                }
            }
            return topborad;
        });
    }
    getTopTen(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = yield this.connection.sendCommand(['zrevrange', gameId, '0', '9', 'withscores']);
            return this.convertUser(data);
        });
    }
    getTop(gameId, top) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = yield this.connection.sendCommand(['zrevrange', gameId, '0', top.toString(), 'withscores']);
            return this.convertUser(data);
        });
    }
    getRange(gameId, begin, end, isReverse) {
        return __awaiter(this, void 0, void 0, function* () {
            var func = 'ZRANGE';
            if (isReverse) {
                func = 'ZREVRANGE';
            }
            var data = yield this.connection.sendCommand([func, gameId, begin.toString(), end.toString(), 'withscores']);
            return this.convertUser(data);
        });
    }
    getCount(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = yield this.connection.sendCommand(['zcount', gameId, '-inf', '+inf']);
            return core_1.RouteResponse.success(data);
        });
    }
    removeGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = yield this.connection.sendCommand(['del', gameId]);
            return core_1.RouteResponse.success(data);
        });
    }
    updateUser(userid, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = yield this.connection.sendCommand(['set', userid, value]);
            return core_1.RouteResponse.success(data);
        });
    }
    convertUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var p = [];
            for (var a = 0; a < data.length; a += 2) {
                var px = yield this.getProfile(data[a]);
                p.push({
                    name: data[a],
                    score: data[a + 1],
                    profile: px
                });
            }
            return p;
        });
    }
    getProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = yield yield this.connection.sendCommand(['get', id]);
            return data;
        });
    }
};
__decorate([
    (0, core_1.OriService)({ isInternal: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], TsOriLeaderboard.prototype, "addScore", null);
__decorate([
    (0, core_1.OriService)({ isInternal: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TsOriLeaderboard.prototype, "getScore", null);
__decorate([
    (0, core_1.OriService)({ isInternal: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], TsOriLeaderboard.prototype, "setScore", null);
__decorate([
    (0, core_1.OriService)({ isInternal: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TsOriLeaderboard.prototype, "removeScore", null);
__decorate([
    (0, core_1.OriService)({ isInternal: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], TsOriLeaderboard.prototype, "getBoard", null);
__decorate([
    (0, core_1.OriService)({ isInternal: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TsOriLeaderboard.prototype, "getTopTen", null);
__decorate([
    (0, core_1.OriService)({ isInternal: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], TsOriLeaderboard.prototype, "getTop", null);
__decorate([
    (0, core_1.OriService)({ isInternal: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Boolean]),
    __metadata("design:returntype", Promise)
], TsOriLeaderboard.prototype, "getRange", null);
__decorate([
    (0, core_1.OriService)({ isInternal: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TsOriLeaderboard.prototype, "getCount", null);
__decorate([
    (0, core_1.OriService)({ isInternal: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TsOriLeaderboard.prototype, "removeGame", null);
__decorate([
    (0, core_1.OriService)({ isInternal: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TsOriLeaderboard.prototype, "updateUser", null);
TsOriLeaderboard = __decorate([
    (0, core_1.OriInjectable)({ domain: 'leaderboard' })
], TsOriLeaderboard);
exports.default = TsOriLeaderboard;
//# sourceMappingURL=Index.js.map