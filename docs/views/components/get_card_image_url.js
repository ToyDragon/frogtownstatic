"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCardImageUrl(cardId, loader) {
    var result = 'https://gatherer.wizards.com/assets/card_back.webp';
    var mid = null;
    var idToMultiverseId = loader.getMapDataSync('IDToMultiverseId');
    if (idToMultiverseId) {
        mid = idToMultiverseId[cardId] || null;
        if (mid === null) {
            var name_1 = loader.getMapDataSync('IDToName')[cardId];
            for (var _i = 0, _a = ((loader.getMapDataSync('NameToID') || {})[name_1] || []); _i < _a.length; _i++) {
                var otherId = _a[_i];
                var otherMid = idToMultiverseId[otherId] || null;
                if (otherMid !== null) {
                    mid = otherMid;
                    break;
                }
            }
        }
    }
    var tokenIdToMultiverseIds = loader.getMapDataSync('TokenIDToMultiverseIds');
    if (mid === null && tokenIdToMultiverseIds && tokenIdToMultiverseIds[cardId]) {
        mid = tokenIdToMultiverseIds[cardId][0];
    }
    var backIdToMultiverseIds = loader.getMapDataSync('BackIDToMultiverseIds');
    if (mid === null && backIdToMultiverseIds && backIdToMultiverseIds[cardId]) {
        mid = backIdToMultiverseIds[cardId][0];
    }
    if (mid) {
        result = "https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=".concat(mid);
    }
    return result;
}
exports.default = getCardImageUrl;
//# sourceMappingURL=get_card_image_url.js.map