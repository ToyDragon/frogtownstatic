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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var card_actions_1 = __importDefault(require("./card_actions"));
var make_mana_icon_1 = __importDefault(require("./make_mana_icon"));
function CompactDetailsCard(props) {
    var _a = (0, react_1.useState)(''), svgText = _a[0], setSvgText = _a[1];
    var idToSetCode = props.loader.getMapDataSync('IDToSetCode');
    if (idToSetCode[props.cardId]) {
        (0, react_1.useEffect)(function () {
            props.urlLoader.load("https://s3.us-west-2.amazonaws.com/frogtown.apricot.setsvgs/".concat(idToSetCode[props.cardId], ".svg")).then(setSvgText);
        }, []);
    }
    var types = [];
    types.splice.apply(types, __spreadArray([0, 0], (props.loader.getMapDataSync('IDToSubtype')[props.cardId] || []), false));
    if (types.length > 0) {
        types.splice(0, 0, '-');
    }
    types.splice.apply(types, __spreadArray([0, 0], (props.loader.getMapDataSync('IDToType')[props.cardId] || []), false));
    types.splice.apply(types, __spreadArray([0, 0], (props.loader.getMapDataSync('IDToSupertype')[props.cardId] || []), false));
    var rarity = props.loader.getMapDataSync('IDToRarity')[props.cardId];
    var rarityColor = 'black';
    if (rarity === 'uncommon') {
        rarityColor = '#a8b0b6';
    }
    if (rarity === 'rare') {
        rarityColor = '#dfcc80';
    }
    if (rarity === 'mythic') {
        rarityColor = '#e24d23';
    }
    var idToText = props.loader.getMapDataSync('IDToText');
    var idToImageUri = props.loader.getMapDataSync('IDToNormalImageURI');
    var bg = (idToImageUri && idToImageUri[props.cardId]) || 'https://www.frogtown.me/Images/CardBack.jpg';
    return (react_1.default.createElement("div", { style: {
            width: 'calc(100% - 8px)',
            height: '225px',
            position: 'relative',
            backgroundColor: props.index % 2 === 1 ? '#303b4c' : '#4d5869',
            color: 'white',
            borderTopLeftRadius: props.index === 0 ? '8px' : '',
            borderTopRightRadius: props.index === 0 ? '8px' : '',
            fontSize: '19px',
        } },
        react_1.default.createElement("div", { "data-hovercardid": props.cardId, style: {
                display: 'inline-block',
                width: '160px',
                height: '225px',
                backgroundSize: '100% 100%',
                backgroundImage: "url(".concat(bg, ")"),
                borderRadius: '8px',
            } }),
        react_1.default.createElement("div", { className: 'actionContainer', style: {
                display: 'inline-block',
                verticalAlign: 'top',
                height: '225px',
                width: 'calc(100% - 160px)',
            } },
            react_1.default.createElement("div", { style: { position: 'relative' } },
                react_1.default.createElement("div", { style: {
                        display: 'inline-block',
                        width: '42px',
                        height: '34px',
                        verticalAlign: 'bottom',
                        fill: rarityColor,
                        marginTop: '4px',
                        marginLeft: '2px',
                    }, title: idToSetCode[props.cardId] || '', dangerouslySetInnerHTML: {
                        __html: svgText.replace(/\n/g, '').replace(/^{.*$/, '')
                            .replace('<svg ', '<svg style="width:100%; height:100%;" '),
                    } }),
                react_1.default.createElement("div", { style: {
                        display: 'inline-block',
                        width: 'calc(100% - 48px)',
                        verticalAlign: 'bottom',
                    }, title: props.loader.getMapDataSync('IDToName')[props.cardId] },
                    react_1.default.createElement("div", { style: {
                            width: '250px',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                        } }, props.loader.getMapDataSync('IDToName')[props.cardId])),
                react_1.default.createElement("div", { style: {
                        position: 'absolute',
                        width: '100px',
                        right: '8px',
                        textAlign: 'right',
                        top: '14px',
                    }, title: props.loader.getMapDataSync('IDToCost')[props.cardId], dangerouslySetInnerHTML: {
                        __html: (props.loader.getMapDataSync('IDToCost')[props.cardId] || '')
                            .replace(/{([0-9/A-Z]+)}/g, (0, make_mana_icon_1.default)('Mana$1'))
                            .replace(/([A-Z])\/([A-Z]).jpg/g, '$1$2.jpg'),
                    } })),
            react_1.default.createElement("div", { style: {
                    position: 'relative',
                    top: '-12px',
                    height: '34px',
                    width: '100%',
                    fontSize: '14px',
                } },
                react_1.default.createElement("div", { style: {
                        position: 'absolute',
                        left: '0',
                        bottom: '0',
                        width: '42px',
                        textAlign: 'center',
                    } }, typeof props.loader.getMapDataSync('IDToPower')[props.cardId] !== 'undefined' ?
                    (props.loader.getMapDataSync('IDToPower')[props.cardId] +
                        '/' + props.loader.getMapDataSync('IDToToughness')[props.cardId]) : null),
                react_1.default.createElement("div", { style: {
                        position: 'absolute',
                        left: '44px',
                        bottom: '0',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        verticalAlign: 'bottom',
                    }, title: types.join(' ') }, types.join(' '))),
            react_1.default.createElement("div", { style: {
                    fontSize: '16px',
                    paddingLeft: '6px',
                    height: '159px',
                    overflow: 'auto',
                    marginTop: '-6px',
                }, dangerouslySetInnerHTML: {
                    __html: (idToText[props.cardId] || '')
                        .replace(/{([0-9/A-Z]+)}/g, (0, make_mana_icon_1.default)('Mana$1'))
                        .replace(/([A-Z])\/([A-Z]).jpg/g, '$1$2.jpg'),
                } }),
            react_1.default.createElement(card_actions_1.default, __assign({ top: false, cardId: props.cardId }, props.actionHandlers)))));
}
exports.default = CompactDetailsCard;
//# sourceMappingURL=compact_details_card.js.map