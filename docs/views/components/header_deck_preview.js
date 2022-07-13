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
var react_1 = __importStar(require("react"));
var map_data_1 = require("../../data/map_data");
function ColorBlock(props) {
    var setColorMapLoaded = (0, react_1.useState)(false)[1];
    (0, react_1.useEffect)(function () {
        props.loader.getMapData('IDToColorIdentity').then(function () {
            setColorMapLoaded(true);
        });
    }, []);
    var idToColorIdentity = props.loader.getMapDataSync('IDToColorIdentity');
    var display = 'none';
    if (idToColorIdentity) {
        for (var _i = 0, _a = props.deck.mainboard; _i < _a.length; _i++) {
            var card = _a[_i];
            if (idToColorIdentity[card].indexOf(props.colorType) >= 0) {
                display = 'inline-block';
                break;
            }
        }
        for (var _b = 0, _c = props.deck.sideboard; _b < _c.length; _b++) {
            var card = _c[_b];
            if (idToColorIdentity[card].indexOf(props.colorType) >= 0) {
                display = 'inline-block';
                break;
            }
        }
    }
    return react_1.default.createElement("div", { style: {
            display: display,
            width: '20px',
            height: '15px',
            transform: 'skew(20deg)',
            border: '1px solid',
            marginLeft: '3px',
            background: "linear-gradient(90deg, ".concat(props.color, ", #3e3f2b)"),
            borderColor: '#3e3f2b',
        } });
}
function HeaderDeckPreview(props) {
    var setImageMapLoaded = (0, react_1.useState)(false)[1];
    (0, react_1.useEffect)(function () {
        props.loader.getMapData('IDToCropImageURI').then(function () {
            setImageMapLoaded(true);
        });
    }, []);
    var url = '';
    var idToCropImageURI = props.loader.getMapDataSync('IDToCropImageURI');
    if (idToCropImageURI) {
        url = "url(\"".concat(idToCropImageURI[props.deck.keycard], "\")");
    }
    var fillParent = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
    };
    var cardCount = props.deck.mainboard.length + props.deck.sideboard.length;
    return react_1.default.createElement("div", { onMouseUp: function () {
            props.changeToDeck();
        }, style: {
            position: 'relative',
            width: '220px',
            height: '160px',
            border: '3px solid #303b4c',
            borderRadius: '6px',
            display: 'inline-block',
            color: 'white',
            verticalAlign: 'top',
            cursor: 'pointer',
            marginBottom: '10px',
            marginRight: '4px',
        } },
        react_1.default.createElement("div", { style: __assign(__assign({}, fillParent), { backgroundImage: url, backgroundSize: '100% 100%' }) }),
        react_1.default.createElement("div", { className: "tbDeckGradiant", style: __assign({}, fillParent) }),
        cardCount === 0 ? null :
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { style: {
                        width: '100%',
                        position: 'absolute',
                        top: '3px',
                        opacity: '0.5',
                        backgroundColor: 'white',
                        height: '20px',
                    } }),
                react_1.default.createElement("div", { style: {
                        width: '100%',
                        textAlign: 'right',
                        position: 'relative',
                        right: '5px',
                        top: '4px',
                    } },
                    react_1.default.createElement(ColorBlock, { color: "#e2ddbf", colorType: map_data_1.MTGCostType.White, deck: props.deck, loader: props.loader }),
                    react_1.default.createElement(ColorBlock, { color: "#3d8acb", colorType: map_data_1.MTGCostType.Blue, deck: props.deck, loader: props.loader }),
                    react_1.default.createElement(ColorBlock, { color: "#3a3b30", colorType: map_data_1.MTGCostType.Black, deck: props.deck, loader: props.loader }),
                    react_1.default.createElement(ColorBlock, { color: "#d04035", colorType: map_data_1.MTGCostType.Red, deck: props.deck, loader: props.loader }),
                    react_1.default.createElement(ColorBlock, { color: "#6dab6c", colorType: map_data_1.MTGCostType.Green, deck: props.deck, loader: props.loader })),
                react_1.default.createElement("div", { style: {
                        width: '100%',
                        position: 'absolute',
                        top: '3px',
                        paddingLeft: '10px',
                        color: '#242424',
                        fontSize: '18px',
                        marginTop: '-2px',
                    } },
                    cardCount,
                    " Cards")),
        react_1.default.createElement("div", { className: "tbDeckName", style: {
                display: 'block',
                width: 'calc(100% - 10px)',
                position: 'absolute',
                left: '5px',
                bottom: '5px',
                fontSize: '24px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                pointerEvents: 'none',
            } }, props.deck.name));
}
exports.default = HeaderDeckPreview;
//# sourceMappingURL=header_deck_preview.js.map