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
function stringFilter(cardIds, map, filterValue) {
    if (!filterValue || !map) {
        return null;
    }
    var exactTokens = [];
    var exactRegex = /"([^"]+)"/;
    var filterValueWithNoExacts = filterValue;
    while (true) {
        var match = exactRegex.exec(filterValueWithNoExacts);
        if (!match) {
            break;
        }
        filterValueWithNoExacts = filterValueWithNoExacts.replace("\"".concat(match[1], "\""), '');
        exactTokens.push(match[1].toLowerCase());
    }
    if (exactTokens.length) {
        console.log(exactTokens);
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
        var lowerCardValue = cardValue.toLowerCase();
        for (var _a = 0, exactTokens_1 = exactTokens; _a < exactTokens_1.length; _a++) {
            var exactToken = exactTokens_1[_a];
            if (lowerCardValue.indexOf(exactToken) === -1) {
                idToRank[id] = -1;
                break;
            }
            else {
                console.log(id, lowerCardValue, exactToken, lowerCardValue.indexOf(exactToken));
            }
        }
        if (idToRank[id] === -1) {
            continue;
        }
        var rank = rankStringMatch(cardValue, filterValue);
        if (rank >= 0) {
            idToRank[id] = rank;
        }
    }
    return idToRank;
}
function exactStringFilter(cardIds, map, filterValue) {
    if (!map || !filterValue) {
        return null;
    }
    var ranking = {};
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
        ranking[cardIds[i]] = matchFound ? 1 : -1;
    }
    return ranking;
}
function substringFilter(cardIds, map, filterValue) {
    if (!map || !filterValue) {
        return null;
    }
    var filterValueWords = filterValue.split(' ').map(function (val) { return cleanName(val); });
    var idToScore = {};
    var highestScore = 0;
    for (var i = cardIds.length - 1; i >= 0; i--) {
        var score = 0;
        var cardVal = map[cardIds[i]];
        if (typeof cardVal === 'string') {
            cardVal = [cardVal];
        }
        if (cardVal) {
            for (var _i = 0, filterValueWords_1 = filterValueWords; _i < filterValueWords_1.length; _i++) {
                var filterWord = filterValueWords_1[_i];
                for (var _a = 0, cardVal_2 = cardVal; _a < cardVal_2.length; _a++) {
                    var val = cardVal_2[_a];
                    var cleanVal = cleanName(val);
                    // Only match on each filter word once. IE if the user enters 'war', don't
                    // double count it for a 'dWARf WARrior'
                    if (cleanVal.split(' ').indexOf(filterWord) >= 0) {
                        score += 10;
                        break;
                    }
                    if (cleanVal.indexOf(filterWord) >= 0) {
                        score++;
                        break;
                    }
                }
            }
        }
        if (score) {
            idToScore[cardIds[i]] = score;
            if (score > highestScore) {
                highestScore = score;
            }
        }
    }
    var rank = {};
    for (var id in idToScore) {
        rank[id] = 1 + highestScore - idToScore[id];
    }
    return rank;
}
function categoryFilter(cardIds, map, filterValue) {
    if (!map) {
        return null;
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
        return null;
    }
    var ranking = {};
    for (var i = cardIds.length - 1; i >= 0; --i) {
        var id = cardIds[i];
        if (!map[id]) {
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
        if (!filterValue.no_others || mismatchesFound === 0) {
            if ((filterValue.mode === 'all' && matchesFound >= allowedCount) ||
                (filterValue.mode === 'any' && matchesFound > 0)) {
                ranking[id] = 1;
            }
        }
    }
    return ranking;
}
function executeFilter(data, loader) {
    return __awaiter(this, void 0, void 0, function () {
        var idToName, seenName, cardIds, id, anyFilterApplied, anySortApplied, cumulativeScores, debugLog, tryApplyFilter, idToSetCode_1, setCodeToRelease_1;
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
                    anySortApplied = false;
                    cumulativeScores = {};
                    debugLog = false;
                    tryApplyFilter = function (ranking) {
                        if (!ranking) {
                            debugLog && console.log('No ranking');
                            return;
                        }
                        anyFilterApplied = true;
                        var cardsRemoved = 0;
                        for (var i = cardIds.length - 1; i >= 0; i--) {
                            if (!ranking[cardIds[i]] || ranking[cardIds[i]] <= 0) {
                                cardsRemoved++;
                                cardIds.splice(i, 1);
                            }
                        }
                        debugLog && console.log("Removed ".concat(cardsRemoved, " cards with no ranking."));
                        var sortedIds = cardIds.slice(0, cardIds.length)
                            .filter(function (a) { return ranking[a] > 0; })
                            .sort(function (a, b) { return ranking[a] - ranking[b]; });
                        // Meta Ranking prevents low cardinality results from bopping unlucky cards. For example,
                        // if 10000 cards match a filter for "type is creature", don't penalize the unlucky 9900 of them
                        // that weren't in the first 100 cards.
                        var rankToMetaRanking = {};
                        var metaRankCount = {};
                        var currentMetaRank = 0;
                        for (var i = 0; i < sortedIds.length; i++) {
                            if (!rankToMetaRanking[ranking[sortedIds[i]]]) {
                                rankToMetaRanking[ranking[sortedIds[i]]] = ++currentMetaRank;
                                debugLog && console.log("Rank ".concat(currentMetaRank, " starts at ").concat(i, "."));
                                metaRankCount[currentMetaRank] = 1;
                            }
                            else {
                                metaRankCount[currentMetaRank]++;
                            }
                        }
                        debugLog && console.log("".concat(currentMetaRank, " Ranks."));
                        // Find the first metarank not overlapping with the 100 best fit cards.
                        var maxIncludedMetaRank = currentMetaRank + 1;
                        var runningTotal = 0;
                        for (var i = 1; i <= currentMetaRank; i++) {
                            if (runningTotal >= 100) {
                                maxIncludedMetaRank = i;
                                break;
                            }
                            runningTotal += metaRankCount[i];
                        }
                        // Binary filters don't give meaningful sorting, so they need secondary sorting later.
                        if (currentMetaRank > 2) {
                            anySortApplied = true;
                        }
                        for (var i = 0; i < sortedIds.length; i++) {
                            var metaRank = rankToMetaRanking[ranking[sortedIds[i]]];
                            // Score is a number from 0 to 100. 0 for the lowest meta rank, 100 for the highest included metarank.
                            var score = 1 + 99 * Math.min(metaRank - 1, maxIncludedMetaRank - 1) / Math.max(maxIncludedMetaRank - 1, 1);
                            cumulativeScores[sortedIds[i]] = (cumulativeScores[sortedIds[i]] || 1) * score;
                        }
                    };
                    /* eslint-disable max-len */
                    if (!data.exact_name_match) {
                        tryApplyFilter(stringFilter(cardIds, idToName, data.name.trim()));
                    }
                    else {
                        tryApplyFilter(exactStringFilter(cardIds, idToName, data.name.trim()));
                    }
                    tryApplyFilter(stringFilter(cardIds, loader.getMapDataSync('IDToText'), data.text.trim()));
                    tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToRarity'), data.rarity));
                    tryApplyFilter(stringFilter(cardIds, loader.getMapDataSync('IDToArtist'), data.artist.trim()));
                    tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToColor'), data.color));
                    tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToColorIdentity'), data.color_identity));
                    tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToType'), data.type));
                    tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToSupertype'), data.super_type));
                    tryApplyFilter(substringFilter(cardIds, loader.getMapDataSync('IDToSubtype'), data.sub_type.trim()));
                    tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToLegalFormat'), data.legal_format));
                    tryApplyFilter((0, execute_number_range_filter_1.default)(cardIds, loader.getMapDataSync('IDToPower'), data.power.trim()));
                    tryApplyFilter((0, execute_number_range_filter_1.default)(cardIds, loader.getMapDataSync('IDToToughness'), data.toughness.trim()));
                    tryApplyFilter((0, execute_number_range_filter_1.default)(cardIds, loader.getMapDataSync('IDToCMC'), data.cmc.trim()));
                    tryApplyFilter(exactStringFilter(cardIds, loader.getMapDataSync('IDToSetCode'), data.set.trim()));
                    /* eslint-enable max-len */
                    if (!anyFilterApplied) {
                        return [2 /*return*/, []];
                    }
                    if (anySortApplied) {
                        cardIds.sort(function (a, b) { return cumulativeScores[a] - cumulativeScores[b]; });
                    }
                    else {
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
                                var aNoArenaPrefix = idToName[a].replace(/^A-/, '');
                                var bNoArenaPrefix = idToName[b].replace(/^A-/, '');
                                return aNoArenaPrefix.localeCompare(bNoArenaPrefix);
                            });
                        }
                    }
                    return [2 /*return*/, cardIds];
            }
        });
    });
}
exports.default = executeFilter;
//# sourceMappingURL=execute_filter.js.map