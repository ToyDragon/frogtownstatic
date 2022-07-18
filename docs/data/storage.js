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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDirectoryStorage = exports.createLocalStorage = void 0;
var debouncer_1 = __importDefault(require("./debouncer"));
function createLocalStorage() {
    var _this = this;
    return {
        get: function (key) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, localStorage.getItem(key)];
        }); }); },
        set: function (key, value) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, localStorage.setItem(key, value)];
        }); }); },
        createDir: function (_name) { return Promise.resolve(null); },
        isBig: false,
    };
}
exports.createLocalStorage = createLocalStorage;
function createDirectoryStorage(folder, unloadable) {
    var _this = this;
    var lastKnownValue = {};
    var pendingValues = {};
    var pendingResolvers = [];
    var debouncer = new debouncer_1.default(2000, unloadable);
    function trySaveToDisk(force) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, result, _c, _i, pendingResolvers_1, resolver;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = force;
                        if (!_b) return [3 /*break*/, 2];
                        return [4 /*yield*/, debouncer.forceAct()];
                    case 1:
                        _b = (_d.sent());
                        _d.label = 2;
                    case 2:
                        _a = (_b);
                        if (_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, debouncer.waitAndShouldAct()];
                    case 3:
                        _a = (_d.sent());
                        _d.label = 4;
                    case 4:
                        if (!_a) return [3 /*break*/, 9];
                        result = false;
                        _d.label = 5;
                    case 5:
                        _d.trys.push([5, 7, , 8]);
                        console.log('Writing batch keys', Object.keys(pendingValues));
                        return [4 /*yield*/, Promise.all(Object.keys(pendingValues).map(function (key) { return __awaiter(_this, void 0, void 0, function () {
                                var writable;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, folder.getFileHandle(key, { create: true })];
                                        case 1: return [4 /*yield*/, (_a.sent())
                                                .createWritable({ keepExistingData: false })];
                                        case 2:
                                            writable = _a.sent();
                                            return [4 /*yield*/, writable.write(pendingValues[key])];
                                        case 3:
                                            _a.sent();
                                            return [4 /*yield*/, writable.close()];
                                        case 4:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 6:
                        _d.sent();
                        result = true;
                        return [3 /*break*/, 8];
                    case 7:
                        _c = _d.sent();
                        return [3 /*break*/, 8];
                    case 8:
                        pendingValues = {};
                        for (_i = 0, pendingResolvers_1 = pendingResolvers; _i < pendingResolvers_1.length; _i++) {
                            resolver = pendingResolvers_1[_i];
                            resolver(result);
                        }
                        pendingResolvers = [];
                        _d.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    return {
        get: function (key) { return __awaiter(_this, void 0, void 0, function () {
            var file, value, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        if (lastKnownValue[key]) {
                            return [2 /*return*/, lastKnownValue[key]];
                        }
                        return [4 /*yield*/, folder.getFileHandle(key)];
                    case 1: return [4 /*yield*/, (_b.sent()).getFile()];
                    case 2:
                        file = _b.sent();
                        return [4 /*yield*/, file.text()];
                    case 3:
                        value = _b.sent();
                        lastKnownValue[key] = value;
                        return [2 /*return*/, value];
                    case 4:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, null];
                }
            });
        }); },
        set: function (key, value, force) { return __awaiter(_this, void 0, void 0, function () {
            var writePromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(force || value !== lastKnownValue[key])) return [3 /*break*/, 2];
                        lastKnownValue[key] = value;
                        pendingValues[key] = value;
                        writePromise = new Promise(function (resolve) {
                            pendingResolvers.push(resolve);
                        });
                        trySaveToDisk(force);
                        return [4 /*yield*/, writePromise];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        console.log('Skipping write of duplicate info for key ', key);
                        return [2 /*return*/, true];
                }
            });
        }); },
        createDir: function (name) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = createDirectoryStorage;
                        return [4 /*yield*/, folder.getDirectoryHandle(name, { create: true })];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent(), unloadable])];
                }
            });
        }); },
        isBig: false,
    };
}
exports.createDirectoryStorage = createDirectoryStorage;
//# sourceMappingURL=storage.js.map