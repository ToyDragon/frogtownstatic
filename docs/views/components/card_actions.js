"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function CardActions(props) {
    var count = 0;
    var position = function () {
        var result = {
            width: '32px',
            height: '32px',
            position: 'absolute',
            zIndex: '3',
            right: (count++ * 32) + 'px',
            backgroundColor: '#1e1e33',
        };
        if (props.top) {
            result['top'] = '0';
        }
        else {
            result['bottom'] = '0';
        }
        return result;
    };
    return react_1.default.createElement(react_1.default.Fragment, null,
        !props.onAdd ? null :
            react_1.default.createElement("div", { className: "action", title: "Add copy of card to deck", style: __assign({ backgroundImage: "url(\"icons/add card32.png\")" }, position()), onMouseUp: function () { return props.onAdd(props.cardId); } },
                react_1.default.createElement("a", { href: "#" })),
        !props.onRemove ? null :
            react_1.default.createElement("div", { className: "action", title: "Remove card from deck", style: __assign({ backgroundImage: "url(\"icons/remove card32.png\")" }, position()), onMouseUp: function () { return props.onRemove(props.cardId); } },
                react_1.default.createElement("a", { href: "#" })),
        !props.onSimilar ? null :
            react_1.default.createElement("div", { className: "action", title: "Find other printings of this card", style: __assign({ backgroundImage: "url(\"icons/misc card32.png\")" }, position()), onMouseUp: function () { return props.onSimilar(props.cardId); } },
                react_1.default.createElement("a", { href: "#" })),
        !props.onSideboard ? null :
            react_1.default.createElement("div", { className: "action", title: "Move card to sideboard", style: __assign({ backgroundImage: "url(\"icons/transfer card32.png\")" }, position()), onMouseUp: function () { return props.onSideboard(props.cardId); } },
                react_1.default.createElement("a", { href: "#" })),
        !props.onMainboard ? null :
            react_1.default.createElement("div", { className: "action", title: "Move card to sideboard", style: __assign({ backgroundImage: "url(\"icons/transfer card32.png\")" }, position()), onMouseUp: function () { return props.onMainboard(props.cardId); } },
                react_1.default.createElement("a", { href: "#" })),
        !props.onStar ? null :
            react_1.default.createElement("div", { className: "action", title: "Mark as the key card to this deck", style: __assign({ backgroundImage: "url(\"icons/star card32.png\")" }, position()), onMouseUp: function () { return props.onStar(props.cardId); } },
                react_1.default.createElement("a", { href: "#" })));
}
exports.default = CardActions;
//# sourceMappingURL=card_actions.js.map