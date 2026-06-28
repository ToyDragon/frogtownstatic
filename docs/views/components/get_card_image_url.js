"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCardImageUrl(cardId, loader) {
    var result = 'https://gatherer.wizards.com/assets/card_back.webp';
    var mid = [];
    var idToMultiverseIds = loader.getMapDataSync('IDToMultiverseIds');
    if (idToMultiverseIds) {
        mid = idToMultiverseIds[cardId];
        if (!mid) {
            var name_1 = loader.getMapDataSync('IDToName')[cardId];
            for (var _i = 0, _a = ((loader.getMapDataSync('NameToID') || {})[name_1] || []); _i < _a.length; _i++) {
                var otherId = _a[_i];
                var otherMid = idToMultiverseIds[otherId];
                if ((otherMid || []).length > 0) {
                    mid = otherMid;
                    break;
                }
            }
        }
    }
    var tokenIdToMultiverseIds = loader.getMapDataSync('TokenIDToMultiverseIds');
    if (!mid && tokenIdToMultiverseIds) {
        mid = tokenIdToMultiverseIds[cardId];
    }
    var backIdToMultiverseIds = loader.getMapDataSync('BackIDToMultiverseIds');
    if (!mid && backIdToMultiverseIds) {
        mid = backIdToMultiverseIds[cardId];
    }
    if (mid) {
        result = "https://gatherer.wizards.com/Handlers/Image.ashx?type=card&multiverseid=".concat(mid[0]);
    }
    return result;
}
exports.default = getCardImageUrl;
//# sourceMappingURL=get_card_image_url.js.map