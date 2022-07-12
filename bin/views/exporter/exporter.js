"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tts_deck_1 = require("./tts_deck");
var Exporter = /** @class */ (function () {
    function Exporter() {
    }
    Exporter.prototype.boardToState = function (backURL, board, index, idToLargeImageURI) {
        var state;
        if (board.cards.length === 1) {
            state = {
                Name: 'Card',
                CustomDeck: {},
                Transform: tts_deck_1.standardTTSTransformForDeck(),
            };
            state.Transform.posX += index * 2.2;
            if (board.faceup) {
                state.Transform.rotZ = 0;
            }
            var cardBackURL = backURL;
            if (board.cards[0].backCardId) {
                cardBackURL = idToLargeImageURI[board.cards[0].backCardId];
            }
            state.CustomDeck['1'] = {
                FaceURL: idToLargeImageURI[board.cards[0].cardId],
                BackURL: cardBackURL,
                NumHeight: 1,
                NumWidth: 1,
                BackIsHidden: true,
            };
            state.CardID = 100;
            state.Nickname = board.cards[0].name;
        }
        else {
            var cardIDToTTSCardID = {};
            state = {
                Name: 'DeckCustom',
                ContainedObjects: [],
                DeckIDs: [],
                CustomDeck: {},
                Transform: tts_deck_1.standardTTSTransformForDeck(),
            };
            state.Transform.posX += index * 2.2;
            if (board.faceup) {
                state.Transform.rotZ = 0;
            }
            var uniqueI = 0;
            for (var i = 0; i < board.cards.length; i++) {
                var cardId = board.cards[i].cardId;
                var ttsCardID = cardIDToTTSCardID[cardId];
                if (!cardIDToTTSCardID[cardId]) {
                    uniqueI++;
                    var deckID = uniqueI * 100;
                    var cardBackURL = backURL;
                    var backCardId = board.cards[i].backCardId;
                    if (backCardId) {
                        cardBackURL = idToLargeImageURI[backCardId];
                    }
                    state.CustomDeck[uniqueI.toString()] = {
                        FaceURL: idToLargeImageURI[board.cards[i].cardId],
                        BackURL: cardBackURL,
                        NumHeight: 1,
                        NumWidth: 1,
                        BackIsHidden: true,
                    };
                    ttsCardID = deckID;
                    cardIDToTTSCardID[cardId] = ttsCardID;
                }
                state.DeckIDs.push(ttsCardID);
                state.ContainedObjects.push({
                    CardID: ttsCardID,
                    Name: 'Card',
                    Nickname: board.cards[i].name,
                    Transform: tts_deck_1.standardTTSTransformForCard(),
                });
            }
        }
        return state;
    };
    Exporter.prototype.export = function (request, idToLargeImageURI) {
        var _this = this;
        if (request.backURL === 'https://www.frogtown.me/Images/CardBack.jpg' ||
            request.backURL === 'https://www.frogtown.me/images/gatherer/CardBack.jpg') {
            var rootURL = window.location.href.split('/').slice(0, 3).join('/');
            request.backURL = rootURL + '/CardBack.jpg';
        }
        return {
            ObjectStates: request.boards.map(function (a, i) {
                return _this.boardToState(request.backURL, a, i, idToLargeImageURI);
            }),
        };
    };
    return Exporter;
}());
exports.Exporter = Exporter;
//# sourceMappingURL=exporter.js.map