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
exports.rankStringMatch = void 0;
var execute_number_range_filter_1 = __importDefault(require("./execute_number_range_filter"));
function cleanName(name) {
    return name.replace(/[,_-]/g, '').toLowerCase();
}
function rankStringMatch(potentialMatch, filterText) {
    if (!potentialMatch) {
        return -1;
    }
    if (potentialMatch === filterText) {
        return 1;
    }
    potentialMatch = cleanName(potentialMatch);
    filterText = cleanName(filterText);
    if (potentialMatch === filterText) {
        return 2;
    }
    if (potentialMatch.indexOf(filterText) >= 0) {
        return 100 - filterText.length;
    }
    var subMatches = [
        0,
        0,
        0, // trigram
    ];
    for (var matchLen = 1; matchLen <= 3; matchLen++) {
        for (var _i = 0, _a = filterText.split(' '); _i < _a.length; _i++) {
            var word = _a[_i];
            for (var i = 0; i < word.length + 1 - matchLen; i++) {
                var submatch = word.substring(i, i + matchLen);
                if (potentialMatch.indexOf(submatch) >= 0) {
                    subMatches[matchLen - 1]++;
                }
            }
        }
    }
    if (subMatches[0] + subMatches[1] + subMatches[2] > 0) {
        return 100000 - subMatches[2] * 100 - subMatches[1] * 10 - subMatches[0];
    }
    return -1;
}
exports.rankStringMatch = rankStringMatch;
function stringFilter(cardIds, map, filterValue, skipSort) {
    if (!filterValue || !map) {
        return false;
    }
    var idToRank = {};
    for (var _i = 0, cardIds_1 = cardIds; _i < cardIds_1.length; _i++) {
        var id = cardIds_1[_i];
        var cardValue = map[id];
        if (!cardValue) {
            continue;
        }
        if (typeof cardValue !== 'string') {
            cardValue = cardValue.join(' ');
        }
        var rank = rankStringMatch(cardValue, filterValue);
        if (rank >= 0) {
            idToRank[id] = rank;
        }
    }
    for (var i = cardIds.length - 1; i >= 0; i--) {
        if (!idToRank[cardIds[i]]) {
            cardIds.splice(i, 1);
        }
    }
    if (!skipSort) {
        cardIds.sort(function (a, b) { return idToRank[a] - idToRank[b]; });
    }
    return true;
}
function exactStringFilter(cardIds, map, filterValue) {
    if (!map || !filterValue) {
        return false;
    }
    filterValue = cleanName(filterValue);
    for (var i = cardIds.length - 1; i >= 0; i--) {
        var matchFound = false;
        var cardVal = map[cardIds[i]];
        if (typeof cardVal === 'string') {
            matchFound = filterValue === cleanName(cardVal);
        }
        else if (cardVal) {
            for (var _i = 0, cardVal_1 = cardVal; _i < cardVal_1.length; _i++) {
                var val = cardVal_1[_i];
                if (filterValue === cleanName(val)) {
                    matchFound = true;
                    break;
                }
            }
        }
        if (!matchFound) {
            cardIds.splice(i, 1);
        }
    }
    return true;
}
function substringFilter(cardIds, map, filterValue, skipSort) {
    if (!map || !filterValue) {
        return false;
    }
    var filterValueWords = filterValue.split(' ').map(function (val) { return cleanName(val); });
    var idToMatches = {};
    var highestMatchCount = 0;
    for (var i = cardIds.length - 1; i >= 0; i--) {
        var matches = 0;
        var cardVal = map[cardIds[i]];
        if (typeof cardVal === 'string') {
            cardVal = [cardVal];
        }
        if (cardVal) {
            for (var _i = 0, filterValueWords_1 = filterValueWords; _i < filterValueWords_1.length; _i++) {
                var filterWord = filterValueWords_1[_i];
                for (var _a = 0, cardVal_2 = cardVal; _a < cardVal_2.length; _a++) {
                    var val = cardVal_2[_a];
                    if (cleanName(val).indexOf(filterWord) >= 0) {
                        matches++;
                        // Only match on each filter word once. IE if the user enters 'war', don't
                        // double count it for a 'dWARf WARrior'
                        break;
                    }
                }
            }
        }
        idToMatches[cardIds[i]] = matches;
        if (matches > highestMatchCount) {
            highestMatchCount = matches;
        }
    }
    if (!skipSort) {
        cardIds.sort(function (a, b) { return idToMatches[b] - idToMatches[a]; });
    }
    for (var i = cardIds.length - 1; i >= 0; i--) {
        if (idToMatches[cardIds[i]] < highestMatchCount) {
            cardIds.splice(i, 1);
        }
    }
    return true;
}
function categoryFilter(cardIds, map, filterValue) {
    if (!map) {
        return false;
    }
    var allowedCount = 0;
    var allowedValues = {};
    for (var value in filterValue.values) {
        if (filterValue.values[value]) {
            allowedValues[value] = true;
            allowedCount++;
        }
    }
    if (allowedCount === 0) {
        return false;
    }
    for (var i = cardIds.length - 1; i >= 0; --i) {
        if (!map[cardIds[i]]) {
            cardIds.splice(i, 1);
            continue;
        }
        var values = map[cardIds[i]];
        if (typeof values === 'string') {
            values = [values];
        }
        var matchesFound = 0;
        var mismatchesFound = 0;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (allowedValues[value]) {
                matchesFound++;
            }
            else {
                mismatchesFound++;
            }
        }
        if ((filterValue.mode === 'all' && matchesFound < allowedCount) ||
            (filterValue.mode === 'any' && matchesFound === 0) ||
            (filterValue.no_others && mismatchesFound > 0)) {
            cardIds.splice(i, 1);
        }
    }
    return true;
}
function executeFilter(data, loader) {
    return __awaiter(this, void 0, void 0, function () {
        var idToName, seenName, cardIds, id, anyFilterApplied, tryApplyFilter, anySortableExecuted, idToSetCode_1, setCodeToRelease_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loader.getMapData('IDToName')];
                case 1:
                    idToName = (_a.sent());
                    seenName = {};
                    cardIds = [];
                    for (id in idToName) {
                        if (!data.show_duplicates && seenName[idToName[id]]) {
                            continue;
                        }
                        seenName[idToName[id]] = true;
                        cardIds.push(id);
                    }
                    anyFilterApplied = false;
                    tryApplyFilter = function (result) {
                        anyFilterApplied = anyFilterApplied || result;
                        return result;
                    };
                    anySortableExecuted = false;
                    /* eslint-disable max-len */
                    if (!data.exact_name_match) {
                        anySortableExecuted = anySortableExecuted || tryApplyFilter(stringFilter(cardIds, idToName, data.name.trim(), anySortableExecuted));
                    }
                    else {
                        anySortableExecuted = anySortableExecuted || tryApplyFilter(exactStringFilter(cardIds, idToName, data.name.trim()));
                    }
                    anySortableExecuted = anySortableExecuted || tryApplyFilter(stringFilter(cardIds, loader.getMapDataSync('IDToText'), data.text.trim(), anySortableExecuted));
                    tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToRarity'), data.rarity));
                    anySortableExecuted = anySortableExecuted || tryApplyFilter(stringFilter(cardIds, loader.getMapDataSync('IDToArtist'), data.artist.trim(), anySortableExecuted));
                    tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToColor'), data.color));
                    tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToColorIdentity'), data.color_identity));
                    tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToType'), data.type));
                    tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToSupertype'), data.super_type));
                    anySortableExecuted = anySortableExecuted || tryApplyFilter(substringFilter(cardIds, loader.getMapDataSync('IDToSubtype'), data.sub_type.trim(), anySortableExecuted));
                    tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToLegalFormat'), data.legal_format));
                    tryApplyFilter((0, execute_number_range_filter_1.default)(cardIds, loader.getMapDataSync('IDToPower'), data.power.trim()));
                    tryApplyFilter((0, execute_number_range_filter_1.default)(cardIds, loader.getMapDataSync('IDToToughness'), data.toughness.trim()));
                    tryApplyFilter((0, execute_number_range_filter_1.default)(cardIds, loader.getMapDataSync('IDToCMC'), data.cmc.trim()));
                    tryApplyFilter(exactStringFilter(cardIds, loader.getMapDataSync('IDToSetCode'), data.set.trim()));
                    /* eslint-enable max-len */
                    if (!anyFilterApplied) {
                        return [2 /*return*/, []];
                    }
                    if (!anySortableExecuted) {
                        if (data.sort_by_release) {
                            idToSetCode_1 = loader.getMapDataSync('IDToSetCode');
                            setCodeToRelease_1 = loader.getMapDataSync('SetCodeToRelease');
                            if (idToSetCode_1 && setCodeToRelease_1) {
                                cardIds.sort(function (a, b) {
                                    var aRelease = new Date(setCodeToRelease_1[idToSetCode_1[a]]).getTime();
                                    var bRelease = new Date(setCodeToRelease_1[idToSetCode_1[b]]).getTime();
                                    return bRelease - aRelease;
                                });
                            }
                        }
                        else {
                            cardIds.sort(function (a, b) {
                                return idToName[a].localeCompare(idToName[b]);
                            });
                        }
                    }
                    // Ensure a maximum of 200 cards is displayed.
                    cardIds.splice(200, cardIds.length - 200);
                    return [2 /*return*/, cardIds];
            }
        });
    });
}
exports.default = executeFilter;
//# sourceMappingURL=execute_filter.js.map