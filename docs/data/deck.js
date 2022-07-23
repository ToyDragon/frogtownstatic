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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyDecks = exports.copyDeck = exports.saveDecksToStorage = exports.loadDecksFromStorage = exports.ensureValidDeck = exports.createNewDeck = void 0;
function createNewDeck(num) {
    return {
        keycard: '75b56b18-47a3-470b-911c-57da82c5ac03',
        name: "Deck #".concat(num),
        mainboard: [],
        sideboard: [],
        backgroundUrl: 'https://i.imgur.com/Hg8CwwU.jpeg',
    };
}
exports.createNewDeck = createNewDeck;
function ensureValidDeck(deck) {
    return {
        name: (typeof deck.name === 'string' && deck.name) || 'Deck Name',
        keycard: (typeof deck.keycard === 'string' && deck.keycard) || '',
        backgroundUrl: (typeof deck.backgroundUrl === 'string' && deck.backgroundUrl) || '',
        mainboard: (Array.isArray(deck.mainboard) && deck.mainboard.filter(function (id) { return typeof id === 'string'; })) || [],
        sideboard: (Array.isArray(deck.sideboard) && deck.sideboard.filter(function (id) { return typeof id === 'string'; })) || [],
    };
}
exports.ensureValidDeck = ensureValidDeck;
function loadDecksFromStorage(storage) {
    return __awaiter(this, void 0, void 0, function () {
        var loadedDecks, _a, _b;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = Array.bind;
                    _b = Number;
                    return [4 /*yield*/, storage.get('deck_count')];
                case 1:
                    loadedDecks = new (_a.apply(Array, [void 0, _b.apply(void 0, [(_c.sent()) || '1'])]))().fill(null);
                    return [4 /*yield*/, Promise.all(loadedDecks.map(function (_, i) { return __awaiter(_this, void 0, void 0, function () {
                            var deck, _a, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        deck = null;
                                        _d.label = 1;
                                    case 1:
                                        _d.trys.push([1, 3, , 4]);
                                        _b = (_a = JSON).parse;
                                        return [4 /*yield*/, storage.get("deck_".concat(i))];
                                    case 2:
                                        deck = _b.apply(_a, [(_d.sent()) || 'null']);
                                        return [3 /*break*/, 4];
                                    case 3:
                                        _c = _d.sent();
                                        return [3 /*break*/, 4];
                                    case 4:
                                        if (!deck) {
                                            deck = createNewDeck(i + 1);
                                        }
                                        loadedDecks[i] = ensureValidDeck(deck);
                                        console.log('Loaded deck ', i, loadedDecks[i]);
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _c.sent();
                    console.log('Loaded all decks');
                    return [2 /*return*/, loadedDecks];
            }
        });
    });
}
exports.loadDecksFromStorage = loadDecksFromStorage;
function saveDecksToStorage(storage, decks) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!storage) {
                        if (decks === null || decks === void 0 ? void 0 : decks.length) {
                            console.error('Decks changed before storage ready: ', decks);
                        }
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Promise.all(__spreadArray(__spreadArray([], decks.map(function (deck, i) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, storage.set("deck_".concat(i), JSON.stringify(deck))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }), true), [
                            storage.set("deck_count", decks.length.toString()),
                        ], false))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.saveDecksToStorage = saveDecksToStorage;
function copyDeck(deck) {
    return {
        name: deck.name,
        keycard: deck.keycard,
        mainboard: deck.mainboard.slice(),
        sideboard: deck.sideboard.slice(),
        backgroundUrl: deck.backgroundUrl || 'https://i.imgur.com/Hg8CwwU.jpeg',
    };
}
exports.copyDeck = copyDeck;
function copyDecks(decks) {
    var newDecks = [];
    for (var _i = 0, decks_1 = decks; _i < decks_1.length; _i++) {
        var deck = decks_1[_i];
        newDecks.push(copyDeck(deck));
    }
    return newDecks;
}
exports.copyDecks = copyDecks;
//# sourceMappingURL=deck.js.map