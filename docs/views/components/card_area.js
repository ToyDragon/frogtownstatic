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
exports.groupModeCompactGrid = exports.groupModeGrid = exports.groupModeSingleGrid = void 0;
var react_1 = __importStar(require("react"));
var card_group_1 = __importDefault(require("./card_group"));
var display_dropdown_1 = require("./display_dropdown");
var grouper_dropdown_1 = require("./grouper_dropdown");
var lazy_background_loader_1 = __importDefault(require("./lazy_background_loader"));
function groupModeSingleGrid(cardIds) {
    var groups = [];
    for (var _i = 0, cardIds_1 = cardIds; _i < cardIds_1.length; _i++) {
        var cardId = cardIds_1[_i];
        groups.push([cardId]);
    }
    return groups;
}
exports.groupModeSingleGrid = groupModeSingleGrid;
function groupModeGrid(cardIds, getName) {
    var groups = [];
    var ids = cardIds.slice().sort(function (a, b) {
        return getName(a).localeCompare(getName(b));
    });
    var group = [];
    var groupName = '';
    for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
        var cardId = ids_1[_i];
        var cardName = getName(cardId);
        if (cardName != groupName || group.length === 4) {
            if (group.length > 0) {
                groups.push(group);
            }
            group = [];
            groupName = cardName;
        }
        group.push(cardId);
    }
    if (group.length > 0) {
        groups.push(group);
    }
    return groups;
}
exports.groupModeGrid = groupModeGrid;
function groupModeCompactGrid(cardIds, getName) {
    var groups = [];
    var ids = cardIds.slice().sort(function (a, b) {
        return getName(a).localeCompare(getName(b));
    });
    var group = [];
    for (var _i = 0, ids_2 = ids; _i < ids_2.length; _i++) {
        var cardId = ids_2[_i];
        if (group.length === 8) {
            groups.push(group);
            group = [];
        }
        group.push(cardId);
    }
    if (group.length > 0) {
        groups.push(group);
    }
    return groups;
}
exports.groupModeCompactGrid = groupModeCompactGrid;
function splitByGroups(loader, grouper, cardIds) {
    var result = [];
    if (typeof grouper !== 'number') {
        result.push({
            name: '',
            stacks: [],
            allCardIds: cardIds.slice(),
        });
    }
    else {
        var cardsByValue = {};
        var idToCMC = loader.getMapDataSync('IDToCMC');
        var idToColor = loader.getMapDataSync('IDToColor');
        var idToType = loader.getMapDataSync('IDToType');
        for (var _i = 0, cardIds_2 = cardIds; _i < cardIds_2.length; _i++) {
            var id = cardIds_2[_i];
            var val = '';
            if (grouper === grouper_dropdown_1.Grouper.CMC) {
                val = idToCMC[id] + '';
            }
            if (grouper === grouper_dropdown_1.Grouper.Color) {
                val = (idToColor[id] || []).map(function (symbol) {
                    if (symbol === 'W')
                        return 'White';
                    if (symbol === 'U')
                        return 'Blue';
                    if (symbol === 'B')
                        return 'Black';
                    if (symbol === 'R')
                        return 'Red';
                    if (symbol === 'G')
                        return 'Green';
                    if (symbol === 'C')
                        return 'Colorless';
                    return symbol;
                }).join(' ') || 'Colorless';
            }
            if (grouper === grouper_dropdown_1.Grouper.Type) {
                val = (idToType[id] || []).join(' ');
            }
            cardsByValue[val] = cardsByValue[val] || [];
            cardsByValue[val].push(id);
        }
        for (var value in cardsByValue) {
            result.push({
                name: value,
                stacks: [],
                allCardIds: cardsByValue[value],
            });
        }
    }
    return result;
}
function CardArea(props) {
    (0, lazy_background_loader_1.default)(props.imageLoadTracker);
    var setImageMapLoaded = (0, react_1.useState)(false)[1];
    (0, react_1.useEffect)(function () {
        props.loader.getMapData('IDToLargeImageURI').then(function () {
            setImageMapLoaded(true);
        });
    }, []);
    var setNameMapLoaded = (0, react_1.useState)(false)[1];
    (0, react_1.useEffect)(function () {
        props.loader.getMapData('IDToName').then(function () {
            setNameMapLoaded(true);
        });
    }, []);
    var nameMap = props.loader.getMapDataSync('IDToName');
    var getName = function (cardId) {
        if (nameMap && nameMap[cardId]) {
            return nameMap[cardId];
        }
        return cardId;
    };
    var groups = splitByGroups(props.loader, props.grouper, props.cardIds);
    for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
        var group = groups_1[_i];
        if (props.displayMode === display_dropdown_1.DisplayMode.SingleGrid) {
            group.stacks = groupModeSingleGrid(group.allCardIds);
        }
        else if (props.displayMode === display_dropdown_1.DisplayMode.Grid) {
            group.stacks = groupModeGrid(group.allCardIds, getName);
        }
        else if (props.displayMode === display_dropdown_1.DisplayMode.CompactGrid) {
            group.stacks = groupModeCompactGrid(group.allCardIds, getName);
        }
        else {
            group.stacks.push(group.allCardIds.slice());
        }
    }
    var countPerGroup = {};
    var runningCount = 0;
    return (react_1.default.createElement("div", { style: {
            paddingTop: '16px',
            paddingLeft: '11px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: (props.displayMode === display_dropdown_1.DisplayMode.List || props.displayMode === display_dropdown_1.DisplayMode.Details) ? '1000px' : '100%',
        } }, groups.map(function (group) {
        return [
            group.name ? react_1.default.createElement("div", { key: "key ".concat(group.name), style: {
                    width: '100%',
                    fontSize: '32px',
                    paddingLeft: '24px',
                } },
                group.name,
                " (",
                group.stacks.map(function (s) { return s.length; }).reduce(function (a, b) { return a + b; }),
                ")") : null,
            group.stacks.map(function (stack) {
                var groupName = group.name + ' ' + stack.join(',');
                countPerGroup[groupName] = countPerGroup[groupName] || 0;
                var result = react_1.default.createElement(card_group_1.default, { key: groupName + '_' + (countPerGroup[groupName]++), loader: props.loader, urlLoader: props.urlLoader, cardIds: stack, imageLoadTracker: props.imageLoadTracker, displayMode: props.displayMode, actionHandlers: props.actionHandlers, previousCount: runningCount });
                runningCount += stack.length;
                return result;
            })
        ];
    })));
}
exports.default = CardArea;
//# sourceMappingURL=card_area.js.map