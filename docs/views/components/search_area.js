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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var debouncer_1 = __importDefault(require("../../data/debouncer"));
var execute_filter_1 = __importDefault(require("../../data/execute_filter"));
var icon_check_1 = __importDefault(require("../bootstrap_icons/icon_check"));
var icon_filter_1 = __importDefault(require("../bootstrap_icons/icon_filter"));
var icon_page_text_1 = __importDefault(require("../bootstrap_icons/icon_page_text"));
var icon_search_1 = __importDefault(require("../bootstrap_icons/icon_search"));
var card_area_1 = __importDefault(require("./card_area"));
var display_dropdown_1 = __importStar(require("./display_dropdown"));
var filter_datalist_1 = __importDefault(require("./filters/filter_datalist"));
var filter_map_category_1 = __importDefault(require("./filters/filter_map_category"));
var filter_text_1 = __importDefault(require("./filters/filter_text"));
function initFilterData() {
    return {
        name: '',
        text: '',
        rarity: { mode: 'all', values: {}, no_others: false },
        color: { mode: 'all', values: {}, no_others: false },
        color_identity: { mode: 'all', values: {}, no_others: true },
        super_type: { mode: 'any', values: {}, no_others: false },
        sub_type: '',
        type: { mode: 'any', values: {}, no_others: false },
        legal_format: { mode: 'any', values: {}, no_others: false },
        power: '',
        toughness: '',
        cmc: '',
        set: '',
        show_duplicates: false,
        sort_by_release: false,
    };
}
function MiscFilterOption(props) {
    var _a = (0, react_1.useState)(true), disabled = _a[0], setDisabled = _a[1];
    if (disabled) {
        var mapPromises = [];
        for (var _i = 0, _b = props.maps; _i < _b.length; _i++) {
            var map = _b[_i];
            mapPromises.push(props.loader.getMapData(map));
        }
        Promise.all(mapPromises).then(function () {
            setDisabled(false);
        });
    }
    return (react_1.default.createElement("li", { style: {
            backgroundColor: disabled ? 'gray' : 'transparent',
        } },
        react_1.default.createElement("a", { className: "dropdown-item", href: "#", onMouseUp: function () {
                if (!disabled) {
                    props.setValue(!props.value);
                }
            } },
            props.children,
            " ",
            react_1.default.createElement(icon_check_1.default, { visible: props.value }))));
}
function initEnabledFilters() {
    return {
        name: true,
        text: true,
        rarity: false,
        color: false,
        color_identity: false,
        super_type: false,
        sub_type: false,
        type: false,
        legal_format: false,
        power: false,
        toughness: false,
        cmc: false,
        set: false,
        show_duplicates: false,
        sort_by_release: false,
        misc: false,
    };
}
var debouncer = new debouncer_1.default(150, document);
var searchArea = (0, react_1.forwardRef)(function searchArea(props, ref) {
    var _this = this;
    var _a = (0, react_1.useState)(display_dropdown_1.DisplayMode.SingleGrid), displayMode = _a[0], setDisplayMode = _a[1];
    var _b = (0, react_1.useState)(initFilterData()), filterData = _b[0], setFilterData = _b[1];
    var _c = (0, react_1.useState)(initEnabledFilters()), enabledFilters = _c[0], setEnabledFilters = _c[1];
    var _d = (0, react_1.useState)([]), results = _d[0], setResults = _d[1];
    var setFilterDataAndExecute = function (newFilterData) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setFilterData(newFilterData);
                    return [4 /*yield*/, debouncer.waitAndShouldAct()];
                case 1:
                    if (!_b.sent()) return [3 /*break*/, 3];
                    _a = setResults;
                    return [4 /*yield*/, (0, execute_filter_1.default)(newFilterData, props.loader)];
                case 2:
                    _a.apply(void 0, [_b.sent()]);
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var setFilterDataAndExecuteImmediately = function (newFilterData) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setFilterData(newFilterData);
                    debouncer.forceAct();
                    _a = setResults;
                    return [4 /*yield*/, (0, execute_filter_1.default)(newFilterData, props.loader)];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    }); };
    // Helper that builds a function that sets the value in the filterData for a specific key, and keeps all other values
    // the same. If no other changes are made in the debounce period, it executes the filter and applies the results.
    var filterDataSetter = function (key) {
        return function (value) { return __awaiter(_this, void 0, void 0, function () {
            var newFilterData;
            return __generator(this, function (_a) {
                newFilterData = __assign({}, filterData);
                newFilterData[key] = value;
                // Strings are typed on the keyboard character by character, so we use the debouncer to reduce jumpy-ness while
                // typing. That is not necessary when clicking dropdown items.
                if (typeof initFilterData()[key] === 'string') {
                    setFilterDataAndExecute(newFilterData);
                }
                else {
                    setFilterDataAndExecuteImmediately(newFilterData);
                }
                return [2 /*return*/];
            });
        }); };
    };
    // Helper that creates a list item for toggling whther
    var createToggleFilterItem = function (text, key) {
        return (react_1.default.createElement("li", null,
            react_1.default.createElement("a", { className: "dropdown-item", href: "#", onMouseUp: function () {
                    var newEnabledFilters = __assign({}, enabledFilters);
                    newEnabledFilters[key] = !newEnabledFilters[key];
                    setEnabledFilters(newEnabledFilters);
                    if (key !== 'misc') {
                        filterDataSetter(key)(initFilterData()[key]);
                    }
                    else {
                        filterDataSetter('sort_by_release')(initFilterData()['sort_by_release']);
                        filterDataSetter('show_duplicates')(initFilterData()['show_duplicates']);
                    }
                } },
                text,
                " ",
                react_1.default.createElement(icon_check_1.default, { visible: enabledFilters[key] }))));
    };
    var onSimilar = function (cardId) { return __awaiter(_this, void 0, void 0, function () {
        var idToName, newFilterData, newEnabledFilters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, props.loader.getMapData('IDToName')];
                case 1:
                    idToName = _a.sent();
                    newFilterData = initFilterData();
                    newFilterData['name'] = idToName[cardId];
                    newFilterData['show_duplicates'] = true;
                    setFilterDataAndExecute(newFilterData);
                    newEnabledFilters = __assign({}, enabledFilters);
                    newEnabledFilters['misc'] = true;
                    setEnabledFilters(newEnabledFilters);
                    return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        onSimilar: function (cardId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, onSimilar(cardId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
    }); });
    var miscValueDisplay = [
        filterData.show_duplicates ? 'Show Duplicates' : '',
        filterData.sort_by_release ? 'Sort by Release' : '',
    ].filter(function (a) { return !!a; }).join(', ');
    if (miscValueDisplay.length) {
        miscValueDisplay = " (".concat(miscValueDisplay, ")");
    }
    return (react_1.default.createElement("div", { style: {
            width: "".concat(props.width, "px"),
            height: 'calc(100% - 64px)',
            overflowY: 'scroll',
            marginTop: '64px',
            display: 'inline-block',
            overflow: 'hidden',
        } },
        react_1.default.createElement("div", { style: {
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            } },
            react_1.default.createElement("div", { style: {
                    paddingTop: '12px',
                    paddingLeft: '12px',
                    width: '100%',
                    backgroundColor: '#303b4c',
                    flexGrow: '0',
                } },
                react_1.default.createElement(filter_text_1.default, { maps: ['IDToName', 'NameToID'], visible: true, loader: props.loader, value: filterData.name, setValue: filterDataSetter('name') },
                    react_1.default.createElement(icon_search_1.default, null),
                    "\u00A0Name"),
                react_1.default.createElement(filter_text_1.default, { maps: ['IDToText'], loader: props.loader, visible: enabledFilters['text'], value: filterData.text, setValue: filterDataSetter('text') },
                    react_1.default.createElement(icon_page_text_1.default, null),
                    "\u00A0Text"),
                react_1.default.createElement(filter_map_category_1.default, { map: 'IDToRarity', loader: props.loader, visible: enabledFilters['rarity'], value: filterData.rarity, setValue: filterDataSetter('rarity'), multiSelect: false, bannedValues: { 'bonus': true } }, "Rarity"),
                react_1.default.createElement(filter_datalist_1.default, { map: 'SetCodeToSetName', otherRequiredMaps: ['IDToSetCode'], loader: props.loader, visible: enabledFilters['set'], value: filterData.set, setValue: filterDataSetter('set') }, "Set"),
                react_1.default.createElement(filter_map_category_1.default, { map: 'IDToColor', loader: props.loader, visible: enabledFilters['color'], value: filterData.color, setValue: filterDataSetter('color'), multiSelect: true, categories: [
                        { value: 'W', display: react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("img", { src: "icons/ManaW.jpg", style: { marginTop: '-5px' } }),
                                " White") },
                        { value: 'U', display: react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("img", { src: "icons/ManaU.jpg", style: { marginTop: '-5px' } }),
                                " Blue") },
                        { value: 'B', display: react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("img", { src: "icons/ManaB.jpg", style: { marginTop: '-5px' } }),
                                " Black") },
                        { value: 'R', display: react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("img", { src: "icons/ManaR.jpg", style: { marginTop: '-5px' } }),
                                " Red") },
                        { value: 'G', display: react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("img", { src: "icons/ManaG.jpg", style: { marginTop: '-5px' } }),
                                " Green") },
                    ] }, "Color"),
                react_1.default.createElement(filter_map_category_1.default, { map: 'IDToColorIdentity', loader: props.loader, visible: enabledFilters['color_identity'], value: filterData.color_identity, setValue: filterDataSetter('color_identity'), multiSelect: true, categories: [
                        { value: 'W', display: react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("img", { src: "icons/ManaW.jpg", style: { marginTop: '-5px' } }),
                                " White") },
                        { value: 'U', display: react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("img", { src: "icons/ManaU.jpg", style: { marginTop: '-5px' } }),
                                " Blue") },
                        { value: 'B', display: react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("img", { src: "icons/ManaB.jpg", style: { marginTop: '-5px' } }),
                                " Black") },
                        { value: 'R', display: react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("img", { src: "icons/ManaR.jpg", style: { marginTop: '-5px' } }),
                                " Red") },
                        { value: 'G', display: react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("img", { src: "icons/ManaG.jpg", style: { marginTop: '-5px' } }),
                                " Green") },
                    ] }, "Color Identity"),
                react_1.default.createElement(filter_map_category_1.default, { map: 'IDToSupertype', loader: props.loader, visible: enabledFilters['super_type'], value: filterData.super_type, setValue: filterDataSetter('super_type'), multiSelect: false }, "SuperType"),
                react_1.default.createElement(filter_map_category_1.default, { map: 'IDToType', loader: props.loader, visible: enabledFilters['type'], value: filterData.type, setValue: filterDataSetter('type'), multiSelect: true, bannedValues: {
                        'Eaturecray': true, 'Scariest': true, 'You': true, 'instant': true, 'Summon': true, 'Wolf': true,
                        'Elemental': true, 'Dragon': true, 'Jaguar': true, 'Knights': true, 'Goblin': true,
                    } }, "Type"),
                react_1.default.createElement(filter_text_1.default, { maps: ['IDToSubtype'], loader: props.loader, visible: enabledFilters['sub_type'], value: filterData.sub_type, setValue: filterDataSetter('sub_type') },
                    react_1.default.createElement(icon_page_text_1.default, null),
                    "\u00A0SubType"),
                react_1.default.createElement(filter_text_1.default, { maps: ['IDToPower'], loader: props.loader, visible: enabledFilters['power'], value: filterData.power, setValue: filterDataSetter('power'), placeholder: "3-4" },
                    react_1.default.createElement(icon_page_text_1.default, null),
                    "\u00A0Power"),
                react_1.default.createElement(filter_text_1.default, { maps: ['IDToToughness'], loader: props.loader, visible: enabledFilters['toughness'], value: filterData.toughness, setValue: filterDataSetter('toughness'), placeholder: "3-4" },
                    react_1.default.createElement(icon_page_text_1.default, null),
                    "\u00A0Toughness"),
                react_1.default.createElement(filter_text_1.default, { maps: ['IDToCMC'], loader: props.loader, visible: enabledFilters['cmc'], value: filterData.cmc, setValue: filterDataSetter('cmc'), placeholder: "3-4" },
                    react_1.default.createElement(icon_page_text_1.default, null),
                    "\u00A0CMC"),
                react_1.default.createElement(filter_map_category_1.default, { map: 'IDToLegalFormat', loader: props.loader, visible: enabledFilters['legal_format'], value: filterData.legal_format, setValue: filterDataSetter('legal_format'), multiSelect: false, bannedValues: {
                        'duel': true, 'paupercommander': true, 'historicbrawl': true, 'gladiator': true, 'oldschool': true,
                        'premodern': true, 'future': true,
                    } }, "Legallity"),
                react_1.default.createElement("div", { className: "input-group", style: {
                        display: enabledFilters['misc'] ? 'inline-block' : 'none',
                        width: 'unset',
                        marginLeft: '5px',
                    } },
                    react_1.default.createElement("button", { type: "button", className: "btn btn-light dropdown-toggle", "data-bs-toggle": "dropdown", "aria-expanded": "false" },
                        react_1.default.createElement("div", { style: { display: 'inline-block' } },
                            "Misc",
                            react_1.default.createElement("span", { style: { fontSize: '12px' } }, miscValueDisplay))),
                    react_1.default.createElement("ul", { className: "dropdown-menu" },
                        react_1.default.createElement(MiscFilterOption, { loader: props.loader, maps: ['IDToName'], value: filterData.show_duplicates, setValue: filterDataSetter('show_duplicates') }, "Show Duplicates"),
                        react_1.default.createElement(MiscFilterOption, { loader: props.loader, maps: ['IDToSetCode', 'SetCodeToRelease'], value: filterData.sort_by_release, setValue: filterDataSetter('sort_by_release') }, "Sort By Release"))),
                react_1.default.createElement("div", { className: "input-group", style: {
                        display: 'inline-block',
                        width: '105px',
                        marginLeft: '5px',
                    } },
                    react_1.default.createElement("button", { type: "button", className: "btn btn-primary dropdown-toggle", "data-bs-toggle": "dropdown", "aria-expanded": "false" },
                        react_1.default.createElement(icon_filter_1.default, null),
                        " Filters "),
                    react_1.default.createElement("ul", { className: "dropdown-menu" },
                        createToggleFilterItem('Text', 'text'),
                        createToggleFilterItem('Rarity', 'rarity'),
                        createToggleFilterItem('Set', 'set'),
                        createToggleFilterItem('Color', 'color'),
                        createToggleFilterItem('Color Identity', 'color_identity'),
                        createToggleFilterItem('SuperType', 'super_type'),
                        createToggleFilterItem('Type', 'type'),
                        createToggleFilterItem('SubType', 'sub_type'),
                        createToggleFilterItem('Power', 'power'),
                        createToggleFilterItem('Toughness', 'toughness'),
                        createToggleFilterItem('CMC', 'cmc'),
                        createToggleFilterItem('Legality', 'legal_format'),
                        createToggleFilterItem('Misc', 'misc'),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("hr", { className: "dropdown-divider" })),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { className: "dropdown-item", href: "#", onMouseUp: function () {
                                    setEnabledFilters(initEnabledFilters());
                                    setFilterDataAndExecute(initFilterData());
                                } }, "Clear Filters")),
                        react_1.default.createElement("li", null,
                            react_1.default.createElement("a", { className: "dropdown-item", href: "#", onMouseUp: function () {
                                    var newEnabledFilters = __assign({}, enabledFilters);
                                    for (var key in newEnabledFilters) {
                                        if (!newEnabledFilters[key]) {
                                            newEnabledFilters[key] = true;
                                        }
                                    }
                                    setEnabledFilters(newEnabledFilters);
                                } }, "Show All")))),
                react_1.default.createElement(display_dropdown_1.default, { loader: props.loader, value: displayMode, setValue: setDisplayMode, allowedModes: [
                        display_dropdown_1.DisplayMode.SingleGrid,
                        display_dropdown_1.DisplayMode.SmallList,
                        display_dropdown_1.DisplayMode.SmallDetails,
                    ] })),
            react_1.default.createElement("div", { style: {
                    width: '100%',
                    flexGrow: '1',
                    overflowY: 'scroll',
                } },
                react_1.default.createElement(card_area_1.default, { imageLoadTracker: props.imageLoadTracker, cardIds: results, displayMode: displayMode, loader: props.loader, urlLoader: props.urlLoader, actionHandlers: {
                        onAdd: function (cardId) {
                            props.addCard(cardId);
                        },
                        onSimilar: onSimilar,
                    } })))));
});
exports.default = searchArea;
//# sourceMappingURL=search_area.js.map