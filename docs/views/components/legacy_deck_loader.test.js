"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var memory_url_loader_1 = __importDefault(require("./memory_url_loader"));
var legacy_deck_loader_1 = __importStar(require("../legacy_deck_loader"));
it('loads decks for specific id', function () { return __awaiter(void 0, void 0, void 0, function () {
    var urlLoader, loaded, loadPromise, legacyData, newDecks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                urlLoader = new memory_url_loader_1.default();
                loaded = false;
                loadPromise = (0, legacy_deck_loader_1.loadLegacyDecksForPublicId)('a', [], urlLoader).then(function (decks) {
                    loaded = true;
                    return decks;
                });
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 0); })];
            case 1:
                _a.sent();
                expect(loaded).toBeFalsy();
                legacyData = {
                    cardbackUrl: 'test.com/wow.png',
                    decks: [
                        {
                            name: 'wow',
                            keycard: 'b',
                            mainboard: ['c', 'd', 'd'],
                            sideboard: ['c', 'e'],
                        },
                    ],
                };
                urlLoader.setLoaded("https://s3.us-west-2.amazonaws.com/frogtown.userdecklists/".concat('a', ".json"), JSON.stringify(legacyData));
                return [4 /*yield*/, loadPromise];
            case 2:
                newDecks = _a.sent();
                expect(newDecks).toEqual([__assign({ backgroundUrl: legacyData.cardbackUrl }, legacyData.decks[0])]);
                return [2 /*return*/];
        }
    });
}); });
it('doesnt add duplicate decks', function () { return __awaiter(void 0, void 0, void 0, function () {
    var originalDecks, legacyData, urlLoader, newDecks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                originalDecks = [
                    {
                        name: 'a',
                        keycard: 'b',
                        backgroundUrl: 'test.com/wow.png',
                        mainboard: ['a', 'b'],
                        sideboard: ['c'],
                    },
                ];
                legacyData = {
                    cardbackUrl: 'test.com/wow.png',
                    decks: [
                        {
                            name: 'a',
                            keycard: 'b',
                            mainboard: ['a', 'b'],
                            sideboard: ['c'],
                        },
                        {
                            name: 'wow',
                            keycard: 'b',
                            mainboard: ['c', 'd', 'd'],
                            sideboard: ['c', 'e'],
                        },
                    ],
                };
                urlLoader = new memory_url_loader_1.default();
                urlLoader.setLoaded("https://s3.us-west-2.amazonaws.com/frogtown.userdecklists/".concat('a', ".json"), JSON.stringify(legacyData));
                return [4 /*yield*/, (0, legacy_deck_loader_1.loadLegacyDecksForPublicId)('a', __spreadArray([], originalDecks, true), urlLoader)];
            case 1:
                newDecks = _a.sent();
                expect(newDecks).toEqual([
                    originalDecks[0],
                    __assign({ backgroundUrl: 'test.com/wow.png' }, legacyData.decks[1]),
                ]);
                return [2 /*return*/];
        }
    });
}); });
it('parses ids correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
    var urlLoader, legacyWWWData, fnSetId, fnSetBetaId, storage, newDecks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                urlLoader = new memory_url_loader_1.default();
                legacyWWWData = {
                    cardbackUrl: 'test.com/wow.png',
                    decks: [
                        {
                            name: 'wow',
                            keycard: 'b',
                            mainboard: ['a', 'b'],
                            sideboard: ['c'],
                        },
                    ],
                };
                urlLoader.setLoaded("https://s3.us-west-2.amazonaws.com/frogtown.userdecklists/".concat('abc123_www', ".json"), JSON.stringify(legacyWWWData));
                urlLoader.setLoaded("https://s3.us-west-2.amazonaws.com/frogtown.userdecklists/".concat('abc123_beta', ".json"), '{}');
                fnSetId = jest.fn(function (_id) { return 0; });
                fnSetBetaId = jest.fn(function (_id) { return 0; });
                storage = {
                    getItem: jest.fn(function (_key) { return null; }),
                    setItem: jest.fn(function (_key, _val) { return null; }),
                };
                return [4 /*yield*/, (0, legacy_deck_loader_1.default)([], fnSetId, fnSetBetaId, '?legacyBetaPublicId=abc123_beta', 'privateId=longprivateidwow12345678; publicId=abc123_www; DeckViewerDeck=0', urlLoader, storage)];
            case 1:
                newDecks = _a.sent();
                expect(newDecks === null || newDecks === void 0 ? void 0 : newDecks.length).toEqual(1);
                expect(fnSetBetaId.mock.calls[0][0]).toEqual('abc123_beta');
                expect(storage.setItem.mock.calls[0][0]).toEqual('legacy_beta_public_id');
                expect(storage.setItem.mock.calls[0][1]).toEqual('abc123_beta');
                expect(fnSetId.mock.calls[0][0]).toEqual('abc123_www');
                expect(storage.setItem.mock.calls[1][0]).toEqual('legacy_public_id');
                expect(storage.setItem.mock.calls[1][1]).toEqual('abc123_www');
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=legacy_deck_loader.test.js.map