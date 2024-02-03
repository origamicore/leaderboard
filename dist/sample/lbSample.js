"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importStar(require("@origamicore/core"));
const LeaderboardRouter_1 = __importDefault(require("../src/LeaderboardRouter"));
const LeaderboardConfig_1 = __importDefault(require("../src/models/LeaderboardConfig"));
class lbSample {
    constructor() {
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            var config = new core_1.ConfigModel({
                packageConfig: [
                    new LeaderboardConfig_1.default({})
                ]
            });
            var origamicore = new core_1.default(config);
            yield origamicore.start();
            var gameid = 'samplegame';
            var userid = '1234';
            yield LeaderboardRouter_1.default.removeGame(gameid);
            for (let a = 0; a < 30; a++) {
                yield LeaderboardRouter_1.default.setScore(gameid, 100 + a, '123' + a);
                yield LeaderboardRouter_1.default.updateUser('123' + a, 'vahid ' + a);
            }
            console.log(yield LeaderboardRouter_1.default.getScore(gameid, '1235'));
            console.log(yield LeaderboardRouter_1.default.getCount(gameid));
            console.log(yield LeaderboardRouter_1.default.getRange(gameid, 10, 15));
            console.log(yield LeaderboardRouter_1.default.getBoard(gameid, '12328', 3, 5));
            console.log(yield LeaderboardRouter_1.default.getBoard(gameid, '12320', 1, 5));
            console.log(yield LeaderboardRouter_1.default.getTop(gameid, 5));
            // console.log(await LeaderboardRouter.setScore(gameid,12.4,userid));
            // console.log(await LeaderboardRouter.getScore(gameid,userid));
            // console.log(await LeaderboardRouter.getScore(gameid,'userid'));
            // console.log(await LeaderboardRouter.addScore(gameid,1,userid));
            // console.log(await LeaderboardRouter.addScore(gameid,3,'vh1'));
            // console.log(await LeaderboardRouter.addScore(gameid,5,'vh3'));
            // console.log(await LeaderboardRouter.getCount(gameid));
            // console.log(await LeaderboardRouter.updateUser(userid,'vahid'));
            // console.log(await LeaderboardRouter.getTop(gameid,1));
            // console.log(await LeaderboardRouter.getRange(gameid,0,5));
            // console.log(await LeaderboardRouter.removeGame(gameid));
            // console.log(await LeaderboardRouter.removeGame(gameid));
        });
    }
}
new lbSample();
//# sourceMappingURL=lbSample.js.map