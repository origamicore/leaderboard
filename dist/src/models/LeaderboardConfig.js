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
const Index_1 = __importDefault(require("../Index"));
class LeaderboardConfig extends core_1.ModuleConfig {
    constructor(fields) {
        super(fields);
        this.port = 6379;
        this.host = 'localhost';
        this.db = 0;
        if (fields)
            Object.assign(this, fields);
    }
    createInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            var instance = new Index_1.default();
            yield instance.jsonConfig(this);
            return instance;
        });
    }
}
exports.default = LeaderboardConfig;
//# sourceMappingURL=LeaderboardConfig.js.map