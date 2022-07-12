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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var card_actions_1 = __importDefault(require("./card_actions"));
var make_mana_icon_1 = __importDefault(require("./make_mana_icon"));
function ListCard(props) {
    var _a = react_1.useState(''), svgText = _a[0], setSvgText = _a[1];
    var idToSetCode = props.loader.getMapDataSync('IDToSetCode');
    if (idToSetCode[props.cardId]) {
        react_1.useEffect(function () {
            props.urlLoader.load("https://s3.us-west-2.amazonaws.com/frogtown.apricot.setsvgs/" + idToSetCode[props.cardId] + ".svg").then(setSvgText);
        }, []);
    }
    var types = [];
    types.splice.apply(types, __spreadArrays([0, 0], (props.loader.getMapDataSync('IDToSubtype')[props.cardId] || [])));
    if (types.length > 0) {
        types.splice(0, 0, '-');
    }
    types.splice.apply(types, __spreadArrays([0, 0], (props.loader.getMapDataSync('IDToType')[props.cardId] || [])));
    types.splice.apply(types, __spreadArrays([0, 0], (props.loader.getMapDataSync('IDToSupertype')[props.cardId] || [])));
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
    return (react_1.default.createElement("div", { className: 'actionContainer', "data-hovercardid": props.cardId, style: {
            width: 'calc(100% - 8px)',
            maxWidth: '750px',
            height: '42px',
            position: 'relative',
            backgroundColor: props.index % 2 === 1 ? '#303b4c' : '#4d5869',
            color: 'white',
            borderTopLeftRadius: props.index === 0 ? '8px' : '',
            borderTopRightRadius: props.index === 0 ? '8px' : '',
        } },
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
                width: '33px',
                textAlign: 'center',
                verticalAlign: 'bottom',
            } }, typeof props.loader.getMapDataSync('IDToPower')[props.cardId] !== 'undefined' ?
            (props.loader.getMapDataSync('IDToPower')[props.cardId] +
                '/' + props.loader.getMapDataSync('IDToToughness')[props.cardId]) : null),
        react_1.default.createElement("div", { style: {
                display: 'inline-block',
                width: '249px',
                verticalAlign: 'bottom',
            }, title: props.loader.getMapDataSync('IDToName')[props.cardId] },
            react_1.default.createElement("div", { style: {
                    width: '250px',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                } },
                props.count,
                "x ",
                props.loader.getMapDataSync('IDToName')[props.cardId])),
        react_1.default.createElement("div", { style: {
                display: 'inline-block',
                width: '100px',
                verticalAlign: 'bottom',
                textAlign: 'right',
                paddingRight: '4px',
            }, title: props.loader.getMapDataSync('IDToCost')[props.cardId], dangerouslySetInnerHTML: {
                __html: (props.loader.getMapDataSync('IDToCost')[props.cardId] || '')
                    .replace(/{([0-9/A-Z]+)}/g, make_mana_icon_1.default('Mana$1')).replace(/([A-Z])\/([A-Z]).jpg/g, '$1$2.jpg'),
            } }),
        react_1.default.createElement("div", { style: {
                display: 'inline-block',
                width: '165px',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                verticalAlign: 'bottom',
            }, title: types.join(' ') }, types.join(' ')),
        react_1.default.createElement(card_actions_1.default, __assign({ top: false, cardId: props.cardId }, props.actionHandlers))));
}
exports.default = ListCard;
//# sourceMappingURL=list_card.js.map