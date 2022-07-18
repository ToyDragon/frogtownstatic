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
exports.loadLegacyDecksForPublicId = void 0;
var deck_1 = require("../../data/deck");
function loadLegacyDecksForPublicId(legacyPublicId, existingDecks, urlLoader) {
    return __awaiter(this, void 0, void 0, function () {
        var loadedDecks, userData, _a, _b, cardback_1, i, mainboardStr, sideboardStr, _i, existingDecks_1, existingDeck, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    loadedDecks = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, urlLoader.load("https://s3.us-west-2.amazonaws.com/frogtown.userdecklists/".concat(legacyPublicId, ".json"))];
                case 2:
                    userData = _b.apply(_a, [_c.sent()]);
                    console.log(userData);
                    cardback_1 = 'https://i.imgur.com/Hg8CwwU.jpeg';
                    if (userData.cardbackUrl && userData.cardbackUrl.indexOf('frogtown.me') === -1) {
                        cardback_1 = userData.cardbackUrl;
                    }
                    loadedDecks = userData.decks.map(function (a) {
                        // Ensure we don't let poorly formatted decks in.
                        return {
                            name: a.name,
                            keycard: a.keycard || a.mainboard[0] || a.sideboard[0] || '4b81165e-f091-4211-8b47-5ea6868b0d4c',
                            mainboard: a.mainboard,
                            sideboard: a.sideboard,
                            backgroundUrl: cardback_1,
                        };
                    });
                    for (i = loadedDecks.length - 1; i >= 0; i--) {
                        mainboardStr = __spreadArray([], loadedDecks[i].mainboard, true).sort().join(',');
                        sideboardStr = __spreadArray([], loadedDecks[i].sideboard, true).sort().join(',');
                        for (_i = 0, existingDecks_1 = existingDecks; _i < existingDecks_1.length; _i++) {
                            existingDeck = existingDecks_1[_i];
                            if (mainboardStr === __spreadArray([], existingDeck.mainboard, true).sort().join(',') &&
                                sideboardStr === __spreadArray([], existingDeck.sideboard, true).sort().join(',')) {
                                loadedDecks.splice(i, 1);
                            }
                        }
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _c.sent();
                    console.error('Unable to load decks from legacy account.');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, loadedDecks];
            }
        });
    });
}
exports.loadLegacyDecksForPublicId = loadLegacyDecksForPublicId;
function loadLegacyDecksInitial(decks, setLegacyPublicId, setLegacyBetaPublicId, search, cookie, urlLoader, storage) {
    return __awaiter(this, void 0, void 0, function () {
        var decksOnlyContainedStarter, legacyBetaPublicId, _a, _b, newlyLoadedDecks, parsedId, _c, _d, newlyLoadedDecks;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    decksOnlyContainedStarter = decks.length === 1 &&
                        JSON.stringify(decks[0]) === JSON.stringify((0, deck_1.createNewDeck)(1));
                    _a = ((search.split('?')[1] || '')
                        .split('&')
                        .filter(function (v) { return v.indexOf('legacyBetaPublicId') === 0; })[0] || '').split('=')[1];
                    if (_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, storage.get('legacy_beta_public_id')];
                case 1:
                    _a = (_e.sent());
                    _e.label = 2;
                case 2:
                    legacyBetaPublicId = _a;
                    setLegacyBetaPublicId(legacyBetaPublicId || '');
                    _b = legacyBetaPublicId;
                    if (!_b) return [3 /*break*/, 4];
                    return [4 /*yield*/, storage.get('legacy_beta_public_id')];
                case 3:
                    _b = (_e.sent()) !== legacyBetaPublicId;
                    _e.label = 4;
                case 4:
                    if (!_b) return [3 /*break*/, 7];
                    return [4 /*yield*/, storage.set('legacy_beta_public_id', legacyBetaPublicId)];
                case 5:
                    _e.sent();
                    console.log('Loading legacy deck for beta public id ', legacyBetaPublicId);
                    return [4 /*yield*/, loadLegacyDecksForPublicId(legacyBetaPublicId, decks, urlLoader)];
                case 6:
                    newlyLoadedDecks = _e.sent();
                    decks.splice.apply(decks, __spreadArray([decks.length, 0], newlyLoadedDecks, false));
                    _e.label = 7;
                case 7:
                    if (!cookie) return [3 /*break*/, 13];
                    parsedId = cookie
                        .split(';')
                        .filter(function (a) { return !!a; })
                        .map(function (a) { return ({ key: a.split('=')[0].trim(), value: a.split('=')[1].trim() }); })
                        .filter(function (a) { return a.key === 'publicId'; })[0].value;
                    setLegacyPublicId(parsedId || '');
                    return [4 /*yield*/, storage.get('legacy_public_id')];
                case 8:
                    if (!((_e.sent()) !== parsedId)) return [3 /*break*/, 13];
                    return [4 /*yield*/, storage.set('legacy_public_id', parsedId)];
                case 9:
                    _e.sent();
                    _c = parsedId;
                    if (!_c) return [3 /*break*/, 11];
                    _d = parsedId;
                    return [4 /*yield*/, storage.get('loaded_legacy_beta_decks')];
                case 10:
                    _c = _d !== (_e.sent());
                    _e.label = 11;
                case 11:
                    if (!_c) return [3 /*break*/, 13];
                    console.log('Loading legacy deck for public id ', parsedId);
                    return [4 /*yield*/, loadLegacyDecksForPublicId(parsedId, decks, urlLoader)];
                case 12:
                    newlyLoadedDecks = _e.sent();
                    decks.splice.apply(decks, __spreadArray([decks.length, 0], newlyLoadedDecks, false));
                    _e.label = 13;
                case 13:
                    if (decksOnlyContainedStarter && decks.length > 1) {
                        decks.splice(0, 1);
                    }
                    return [2 /*return*/, decks];
            }
        });
    });
}
exports.default = loadLegacyDecksInitial;
//# sourceMappingURL=legacy_deck_loader.js.map