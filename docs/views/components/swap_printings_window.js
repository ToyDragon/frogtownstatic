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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var card_area_1 = __importDefault(require("./card_area"));
var display_dropdown_1 = require("./display_dropdown");
var SwapPrintingsWindow = (0, react_1.forwardRef)(function SwapPrintingsWindow(props, ref) {
    var _a = (0, react_1.useState)([]), cardIds = _a[0], setCardIds = _a[1];
    var _b = (0, react_1.useState)(''), cardName = _b[0], setCardName = _b[1];
    var _c = (0, react_1.useState)(''), originalId = _c[0], setOriginalId = _c[1];
    var _d = (0, react_1.useState)(false), isOpen = _d[0], setIsOpen = _d[1];
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        open: function (id) {
            var idToName = props.loader.getMapDataSync('IDToName');
            var name = idToName[id];
            setOriginalId(id);
            setCardName(name);
            var candidates = [];
            for (var id_1 in idToName) {
                if (idToName[id_1] === name) {
                    candidates.push(id_1);
                }
            }
            setCardIds(candidates);
            setIsOpen(true);
        },
    }); });
    if (!isOpen) {
        return null;
    }
    return react_1.default.createElement("div", { style: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            backgroundColor: '#00000070',
            zIndex: '6',
        }, onMouseUp: function (e) {
            if (e.button === 0) {
                setIsOpen(false);
            }
        } },
        react_1.default.createElement("div", { style: {
                width: 'calc(100% - 200px)',
                height: 'calc(100% - 200px)',
                position: 'absolute',
                left: '100px',
                top: '100px',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '3px solid #cdd6e4',
                padding: '16px',
            }, onMouseUp: function (e) { return e.stopPropagation(); } },
            react_1.default.createElement("div", { style: {
                    fontSize: '24px',
                } }, "Printings of \"".concat(cardName, "\"")),
            react_1.default.createElement("div", { style: {
                    height: 'calc(100% - 85px)',
                    overflowY: 'scroll',
                } },
                react_1.default.createElement(card_area_1.default, { cardIds: cardIds, displayMode: display_dropdown_1.DisplayMode.SingleGrid, imageLoadTracker: props.imageLoadTracker, loader: props.loader, urlLoader: props.urlLoader, actionHandlers: {
                        onAdd: props.addCard,
                        onSwap: function (id) {
                            props.swapCard(originalId, id);
                            setIsOpen(false);
                        },
                    } })),
            react_1.default.createElement("div", { style: { position: 'absolute', bottom: '12px', right: '12px' } },
                react_1.default.createElement("button", { className: 'btn btn-secondary', onMouseUp: function (e) {
                        if (e.button === 0) {
                            setIsOpen(false);
                        }
                    }, onKeyDown: function (e) {
                        if (e.key === 'Enter' || e.key === ' ') {
                            setIsOpen(false);
                        }
                    } }, "Cancel"))));
});
exports.default = SwapPrintingsWindow;
//# sourceMappingURL=swap_printings_window.js.map