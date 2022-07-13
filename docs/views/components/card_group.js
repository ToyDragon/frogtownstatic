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
exports.countCards = void 0;
var react_1 = __importDefault(require("react"));
var card_actions_1 = __importDefault(require("./card_actions"));
var compact_details_card_1 = __importDefault(require("./compact_details_card"));
var compact_list_card_1 = __importDefault(require("./compact_list_card"));
var details_card_1 = __importDefault(require("./details_card"));
var display_dropdown_1 = require("./display_dropdown");
var list_card_1 = __importDefault(require("./list_card"));
function countCards(cardIds) {
    var idToCount = {};
    for (var _i = 0, cardIds_1 = cardIds; _i < cardIds_1.length; _i++) {
        var id = cardIds_1[_i];
        idToCount[id] = (idToCount[id] || 0) + 1;
    }
    return Object.keys(idToCount).map(function (id) {
        return {
            id: id,
            count: idToCount[id],
        };
    });
}
exports.countCards = countCards;
;
function CardGroup(props) {
    var idToImageUri = props.loader.getMapDataSync('IDToNormalImageURI');
    if (props.displayMode === display_dropdown_1.DisplayMode.Grid ||
        props.displayMode === display_dropdown_1.DisplayMode.CompactGrid ||
        props.displayMode === display_dropdown_1.DisplayMode.SingleGrid) {
        var multipleCardsInStacks_1 = props.displayMode === display_dropdown_1.DisplayMode.CompactGrid;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: !multipleCardsInStacks_1 ? 'actionContainer' : '', style: {
                    margin: '16px',
                    position: 'relative',
                    width: '223px',
                    height: (312 + (props.cardIds.length - 1) * 37) + 'px',
                } },
                props.cardIds.map(function (cardId, i) {
                    var bg = (idToImageUri && idToImageUri[cardId]) || 'https://www.frogtown.me/Images/CardBack.jpg';
                    var bgProp = props.imageLoadTracker.getURLIsLoaded(bg) ? {} : {
                        'data-lazybackground': bg,
                    };
                    return react_1.default.createElement("div", { key: cardId + '_' + i, className: (multipleCardsInStacks_1 ? 'actionContainer' : '') + ' hoverContainer', style: {
                            borderRadius: '15px',
                            position: 'absolute',
                            top: (37 * i) + 'px',
                            height: (props.displayMode !== display_dropdown_1.DisplayMode.CompactGrid || i === props.cardIds.length - 1) ?
                                '312px' : '37px',
                        } },
                        multipleCardsInStacks_1 ?
                            react_1.default.createElement(card_actions_1.default, __assign({ top: multipleCardsInStacks_1, cardId: cardId }, props.actionHandlers)) :
                            null,
                        react_1.default.createElement("div", __assign({ className: 'hoverToTop' }, bgProp, { style: {
                                backgroundImage: props.imageLoadTracker.getURLIsLoaded(bg) ? "url(\"".concat(bg, "\")") : '',
                                width: '223px',
                                height: '312px',
                                borderRadius: '15px',
                                backgroundSize: '100% 100%',
                                position: 'relative',
                                overflow: 'hidden',
                                pointerEvents: 'none',
                            } })));
                }),
                !multipleCardsInStacks_1 ?
                    react_1.default.createElement(card_actions_1.default, __assign({ top: multipleCardsInStacks_1, cardId: props.cardIds[0] }, props.actionHandlers)) :
                    null)));
    }
    if (props.displayMode === display_dropdown_1.DisplayMode.SmallList) {
        return react_1.default.createElement(react_1.default.Fragment, null, props.cardIds.map(function (cardId, i) {
            return react_1.default.createElement(compact_list_card_1.default, { key: cardId, cardId: cardId, loader: props.loader, urlLoader: props.urlLoader, index: i + props.previousCount, actionHandlers: props.actionHandlers });
        }));
    }
    var countedCards = countCards(props.cardIds);
    if (props.displayMode === display_dropdown_1.DisplayMode.List) {
        return react_1.default.createElement(react_1.default.Fragment, null, countedCards.map(function (idAndCount, i) {
            return react_1.default.createElement(list_card_1.default, { key: idAndCount.id, cardId: idAndCount.id, count: idAndCount.count, loader: props.loader, urlLoader: props.urlLoader, index: i + props.previousCount, actionHandlers: props.actionHandlers });
        }));
    }
    if (props.displayMode === display_dropdown_1.DisplayMode.SmallDetails) {
        return react_1.default.createElement(react_1.default.Fragment, null, props.cardIds.map(function (cardId, i) {
            return react_1.default.createElement(compact_details_card_1.default, { key: cardId, cardId: cardId, loader: props.loader, urlLoader: props.urlLoader, index: i + props.previousCount, actionHandlers: props.actionHandlers });
        }));
    }
    if (props.displayMode === display_dropdown_1.DisplayMode.Details) {
        return react_1.default.createElement(react_1.default.Fragment, null, countedCards.map(function (idAndCount, i) {
            console.log(idAndCount);
            return react_1.default.createElement(details_card_1.default, { key: idAndCount.id, cardId: idAndCount.id, count: idAndCount.count, loader: props.loader, urlLoader: props.urlLoader, index: i + props.previousCount, actionHandlers: props.actionHandlers });
        }));
    }
    if (props.displayMode === display_dropdown_1.DisplayMode.Text) {
        var idToNameMap_1 = props.loader.getMapDataSync('IDToName');
        var idToSetCode_1 = props.loader.getMapDataSync('IDToSetCode');
        return react_1.default.createElement("textarea", { readOnly: true, style: {
                width: '600px',
                height: "".concat((countedCards.length + 1) * 26, "px"),
            }, value: countedCards.map(function (idAndCount) {
                console.log(idAndCount);
                return "".concat(idAndCount.count, " ").concat(idToNameMap_1[idAndCount.id], " <").concat(idToSetCode_1[idAndCount.id], ">\n");
            }).join('') });
    }
    if (props.displayMode === display_dropdown_1.DisplayMode.TextIDs) {
        var idToNameMap_2 = props.loader.getMapDataSync('IDToName');
        var idToSetCode_2 = props.loader.getMapDataSync('IDToSetCode');
        return react_1.default.createElement("textarea", { readOnly: true, style: {
                width: '800px',
                height: "".concat((countedCards.length + 1) * 26, "px"),
            }, value: countedCards.map(function (idAndCount) {
                console.log(idAndCount);
                return "".concat(idAndCount.count, " ").concat(idAndCount.id, " // ").concat(idToNameMap_2[idAndCount.id]) +
                    " <".concat(idToSetCode_2[idAndCount.id], ">\n");
            }).join('') });
    }
    console.error('Unsupported display mode: ' + props.displayMode);
    return react_1.default.createElement("div", null);
}
exports.default = CardGroup;
//# sourceMappingURL=card_group.js.map