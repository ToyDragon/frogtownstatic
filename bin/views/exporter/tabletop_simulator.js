"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TTSExport = __importStar(require("./exporter"));
var TableTopSimulator = /** @class */ (function () {
    function TableTopSimulator(dl) {
        this.exporter = new TTSExport.Exporter();
        this.dl = dl;
        var resolver;
        this.ready = new Promise(function (resolve) {
            resolver = resolve;
        });
        Promise.all([
            dl.getMapData('IDToName'),
            dl.getMapData('IDToTokenStrings'),
            dl.getMapData('IDToLargeImageURI'),
            dl.getMapData('TokenIDToTokenString'),
            dl.getMapData('TokenIDToName'),
            dl.getMapData('FrontIDToBackID'),
        ]).then(function () {
            setTimeout(resolver, 0);
        });
    }
    TableTopSimulator.prototype.getTokens = function (mainboardIds, sideboardIds) {
        var tokens = [];
        var uniquetokens = {};
        var allCandidates = mainboardIds.concat(sideboardIds);
        var IDToTokenStringMap = this.dl.getMapDataSync('IDToTokenStrings');
        if (!IDToTokenStringMap) {
            return [];
        }
        var TokenIDToTokenStringMap = this.dl.getMapDataSync('TokenIDToTokenString');
        if (!TokenIDToTokenStringMap) {
            return [];
        }
        var TokenStringToTokenIDMap = {};
        for (var tokenId in TokenIDToTokenStringMap) {
            TokenStringToTokenIDMap[TokenIDToTokenStringMap[tokenId]] = tokenId;
        }
        for (var _i = 0, allCandidates_1 = allCandidates; _i < allCandidates_1.length; _i++) {
            var cardId = allCandidates_1[_i];
            var oneCardTokens = IDToTokenStringMap[cardId];
            if (oneCardTokens) {
                for (var _a = 0, oneCardTokens_1 = oneCardTokens; _a < oneCardTokens_1.length; _a++) {
                    var tokenString = oneCardTokens_1[_a];
                    var tokenId = TokenStringToTokenIDMap[tokenString];
                    if (tokenId && !uniquetokens[tokenId]) {
                        uniquetokens[tokenId] = true;
                        tokens.push(tokenId);
                    }
                }
            }
        }
        if (tokens.length) {
            console.log("Added tokens " + tokens.length + " tokens");
        }
        return tokens;
    };
    TableTopSimulator.prototype.exportDeck = function (mainboardIds, sideboardIds, backURL) {
        var _this = this;
        var idToLargeImageURI = this.dl.getMapDataSync('IDToLargeImageURI');
        var tokenCardIds = this.getTokens(mainboardIds, sideboardIds);
        var mainboard = {
            cards: [],
            name: 'Mainboard',
        };
        var sideboard = {
            cards: [],
            name: 'Sideboard',
        };
        var tokenboard = {
            cards: [],
            name: 'Tokens',
            faceup: true,
        };
        var flippableboard = {
            cards: [],
            name: 'Flippables',
            faceup: true,
        };
        var processOneCard = function (cardId, board) {
            board.cards.push({
                cardId: cardId,
                name: _this.getCardName(cardId),
            });
            var reverseCard = _this.getBackCardId(cardId);
            if (reverseCard) {
                flippableboard.cards.push({
                    cardId: cardId,
                    backCardId: reverseCard,
                    name: _this.getCardName(cardId),
                });
            }
        };
        for (var _i = 0, mainboardIds_1 = mainboardIds; _i < mainboardIds_1.length; _i++) {
            var id = mainboardIds_1[_i];
            processOneCard(id, mainboard);
        }
        for (var _a = 0, sideboardIds_1 = sideboardIds; _a < sideboardIds_1.length; _a++) {
            var id = sideboardIds_1[_a];
            processOneCard(id, sideboard);
        }
        for (var _b = 0, tokenCardIds_1 = tokenCardIds; _b < tokenCardIds_1.length; _b++) {
            var id = tokenCardIds_1[_b];
            processOneCard(id, tokenboard);
        }
        var compiledDeck = this.exporter.export({
            boards: [mainboard, sideboard, tokenboard, flippableboard].filter(function (b) {
                return b.cards.length > 0;
            }),
            backURL: backURL,
        }, idToLargeImageURI);
        return JSON.stringify(compiledDeck);
    };
    TableTopSimulator.prototype.getCardName = function (cardId) {
        var IDToNameMap = this.dl.getMapDataSync('IDToName');
        if (IDToNameMap && IDToNameMap[cardId]) {
            return IDToNameMap[cardId];
        }
        var TokenIDToNameMap = this.dl.getMapDataSync('TokenIDToName');
        if (TokenIDToNameMap && TokenIDToNameMap[cardId]) {
            return TokenIDToNameMap[cardId];
        }
        return '';
    };
    TableTopSimulator.prototype.getBackCardId = function (cardId) {
        var FrontIDToBackIDMap = this.dl.getMapDataSync('FrontIDToBackID');
        if (FrontIDToBackIDMap && FrontIDToBackIDMap[cardId]) {
            return FrontIDToBackIDMap[cardId];
        }
        return '';
    };
    return TableTopSimulator;
}());
exports.default = TableTopSimulator;
//# sourceMappingURL=tabletop_simulator.js.map