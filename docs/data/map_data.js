"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * String values for all of the available cost symbols.
 */
/* eslint-disable no-unused-vars */
var MTGCostType;
(function (MTGCostType) {
    // Ability specific
    MTGCostType["Tap"] = "T";
    // Normal WUBRG+C
    MTGCostType["White"] = "W";
    MTGCostType["Blue"] = "U";
    MTGCostType["Black"] = "B";
    MTGCostType["Red"] = "R";
    MTGCostType["Green"] = "G";
    MTGCostType["Colorless"] = "C";
    // Half WUBRG
    MTGCostType["HalfWhite"] = "HalfW";
    MTGCostType["HalfBlue"] = "HalfU";
    MTGCostType["HalfBlack"] = "HalfB";
    MTGCostType["HalfRed"] = "HalfR";
    MTGCostType["HalfGreen"] = "HalfG";
    // Color Combos
    MTGCostType["WhiteOrBlue"] = "WU";
    MTGCostType["WhiteOrBlack"] = "WB";
    MTGCostType["BlueOrRed"] = "UR";
    MTGCostType["BlueOrBlack"] = "UB";
    MTGCostType["BlackOrRed"] = "BR";
    MTGCostType["BlackOrGreen"] = "BG";
    MTGCostType["RedOrWhite"] = "RW";
    MTGCostType["RedOrGreen"] = "RG";
    MTGCostType["GreenOrWhite"] = "GW";
    MTGCostType["GreenOrBlue"] = "GU";
    // Color or 2 Colorless
    MTGCostType["WhiteOrTwoColorless"] = "2W";
    MTGCostType["BlueOrTwoColorless"] = "2U";
    MTGCostType["BlackOrTwoColorless"] = "2B";
    MTGCostType["RedOrTwoColorless"] = "2R";
    MTGCostType["GreenOrTwoColorless"] = "2G";
    // Color or 2 Life
    MTGCostType["WhiteOrTwoLife"] = "WP";
    MTGCostType["BlueOrTwoLife"] = "UP";
    MTGCostType["BlackOrTwoLife"] = "BP";
    MTGCostType["RedOrTwoLife"] = "RP";
    MTGCostType["GreenOrTwoLife"] = "GP";
    // Variable
    MTGCostType["X"] = "X";
    MTGCostType["Y"] = "Y";
    MTGCostType["Z"] = "Z";
})(MTGCostType = exports.MTGCostType || (exports.MTGCostType = {}));
/* eslint-enable no-unused-vars */
var MapData = /** @class */ (function () {
    function MapData() {
        this.IDToName = {};
        this.NameToID = {};
        this.IDToCMC = {};
        this.CMCToID = {};
        this.IDToSetCode = {};
        this.SetCodeToID = {};
        this.IDToToughness = {};
        this.ToughnessToID = {};
        this.IDToPower = {};
        this.PowerToID = {};
        this.IDToRarity = {};
        this.RarityToID = {};
        this.IDToColorIdentity = {};
        this.ColorIdentityToID = {};
        this.IDToColor = {};
        this.ColorToID = {};
        this.IDToSubtype = {};
        this.SubtypeToID = {};
        this.IDToSupertype = {};
        this.SupertypeToID = {};
        this.IDToType = {};
        this.TypeToID = {};
        this.IDToLegalFormat = {};
        this.LegalFormatToID = {};
        this.IDToText = {};
        this.FrontIDToBackID = {};
        this.SetCodeToRelease = {};
        this.SetCodeToSetName = {};
        this.TokenIDToName = {};
        this.IDToCollectorsNumber = {};
        this.IDToCost = {};
        this.IDToLargeImageURI = {};
        this.IDToCropImageURI = {};
        this.IDToTokenStrings = {};
        this.TokenStringToTokenID = {};
        this.TokenIDToTokenString = {};
    }
    return MapData;
}());
exports.MapData = MapData;
//# sourceMappingURL=map_data.js.map