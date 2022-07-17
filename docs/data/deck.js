"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureValidDeck = exports.createNewDeck = void 0;
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
        sideboard: (Array.isArray(deck.mainboard) && deck.mainboard.filter(function (id) { return typeof id === 'string'; })) || [],
    };
}
exports.ensureValidDeck = ensureValidDeck;
//# sourceMappingURL=deck.js.map