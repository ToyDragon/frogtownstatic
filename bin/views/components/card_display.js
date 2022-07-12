"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
function CardGroup(props) {
    var _a = react_1.useState(""), imageUrl = _a[0], setImageUrl = _a[1];
    props.loader.getMapData("IDToLargeImageURI").then(function (idToImageUrl) {
        if (idToImageUrl && idToImageUrl[props.cardId]) {
            setImageUrl(idToImageUrl[props.cardId]);
        }
    });
    return (react_1.default.createElement("div", { className: "group" },
        react_1.default.createElement("div", { className: "cardContainer" },
            react_1.default.createElement("div", { className: "card", style: { backgroundImage: imageUrl } }),
            react_1.default.createElement("div", { className: "action add", "data-action": "add", title: "Add copy of card to deck" },
                react_1.default.createElement("a", { href: "#" })),
            react_1.default.createElement("div", { className: "action remove", "data-action": "remove", title: "Remove card from deck" },
                react_1.default.createElement("a", { href: "#" })),
            react_1.default.createElement("div", { className: "action similar", "data-action": "similar", title: "Find other printings of this card" },
                react_1.default.createElement("a", { href: "#" })),
            react_1.default.createElement("div", { className: "action sideboard", "data-action": "tosideboard", title: "Move card to sideboard" },
                react_1.default.createElement("a", { href: "#" })),
            react_1.default.createElement("div", { className: "action star", "data-action": "star", title: "Mark as the key card to this deck" },
                react_1.default.createElement("a", { href: "#" })))));
}
exports.default = CardGroup;
//# sourceMappingURL=card_display.js.map