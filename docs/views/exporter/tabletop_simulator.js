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
            dl.getMapData('TokenIDToLargeImageURI'),
            dl.getMapData('FrontIDToBackID'),
            dl.getMapData('BackIDToLargeImageURI'),
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
        return tokens;
    };
    TableTopSimulator.prototype.exportDeck = function (mainboardIds, sideboardIds, backURL) {
        var _this = this;
        var idToLargeImageURI = this.dl.getMapDataSync('IDToLargeImageURI');
        var tokenIDToLargeImageURI = this.dl.getMapDataSync('TokenIDToLargeImageURI');
        var backIDToLargeImageURI = this.dl.getMapDataSync('BackIDToLargeImageURI');
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
        }, function (id) {
            return idToLargeImageURI[id] ||
                tokenIDToLargeImageURI[id] ||
                backIDToLargeImageURI[id];
        });
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