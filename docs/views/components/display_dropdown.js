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
exports.DisplayMode = void 0;
var react_1 = __importStar(require("react"));
var icon_check_1 = __importDefault(require("../bootstrap_icons/icon_check"));
/* eslint-disable no-unused-vars */
var DisplayMode;
(function (DisplayMode) {
    DisplayMode[DisplayMode["SingleGrid"] = 0] = "SingleGrid";
    DisplayMode[DisplayMode["Grid"] = 1] = "Grid";
    DisplayMode[DisplayMode["CompactGrid"] = 2] = "CompactGrid";
    DisplayMode[DisplayMode["SmallList"] = 3] = "SmallList";
    DisplayMode[DisplayMode["List"] = 4] = "List";
    DisplayMode[DisplayMode["SmallDetails"] = 5] = "SmallDetails";
    DisplayMode[DisplayMode["Details"] = 6] = "Details";
    DisplayMode[DisplayMode["Text"] = 7] = "Text";
    DisplayMode[DisplayMode["TextIDs"] = 8] = "TextIDs";
})(DisplayMode = exports.DisplayMode || (exports.DisplayMode = {}));
;
/* eslint-enable no-unused-vars */
function displayModeName(displayMode) {
    if (displayMode === DisplayMode.Grid ||
        displayMode === DisplayMode.SingleGrid) {
        return 'Grid';
    }
    if (displayMode === DisplayMode.CompactGrid) {
        return 'Compact Grid';
    }
    if (displayMode === DisplayMode.SmallList ||
        displayMode === DisplayMode.List) {
        return 'List';
    }
    if (displayMode === DisplayMode.SmallDetails ||
        displayMode === DisplayMode.Details) {
        return 'Details';
    }
    if (displayMode === DisplayMode.Text) {
        return 'Text';
    }
    if (displayMode === DisplayMode.TextIDs) {
        return 'Text IDs';
    }
    return '';
}
function DisplayDropdown(props) {
    var _a = (0, react_1.useState)(false), listEnabled = _a[0], setListEnabled = _a[1];
    var _b = (0, react_1.useState)(false), detailsEnabled = _b[0], setDetailsEnabled = _b[1];
    var _c = (0, react_1.useState)(false), textEnabled = _c[0], setTextEnabled = _c[1];
    (0, react_1.useEffect)(function () {
        Promise.all([
            props.loader.getMapData('IDToName'),
            props.loader.getMapData('IDToText'),
            props.loader.getMapData('IDToSetCode'),
            props.loader.getMapData('IDToCost'),
            props.loader.getMapData('IDToPower'),
            props.loader.getMapData('IDToToughness'),
            props.loader.getMapData('IDToType'),
            props.loader.getMapData('IDToSupertype'),
            props.loader.getMapData('IDToSubtype'),
        ]).then(function () {
            setDetailsEnabled(true);
        });
        Promise.all([
            props.loader.getMapData('IDToName'),
            props.loader.getMapData('IDToSetCode'),
            props.loader.getMapData('IDToCost'),
            props.loader.getMapData('IDToPower'),
            props.loader.getMapData('IDToToughness'),
        ]).then(function () {
            setListEnabled(true);
        });
        Promise.all([
            props.loader.getMapData('IDToName'),
            props.loader.getMapData('IDToSetCode'),
        ]).then(function () {
            setTextEnabled(true);
        });
    }, []);
    var createModeItem = function (mode, enabled) {
        if (props.allowedModes.indexOf(mode) < 0) {
            return null;
        }
        return (react_1.default.createElement("li", { key: mode, style: {
                backgroundColor: enabled ? 'transparent' : 'lightgray',
            } },
            react_1.default.createElement("a", { className: "dropdown-item", href: "#", onMouseUp: function () {
                    if (enabled) {
                        props.setValue(mode);
                    }
                } },
                displayModeName(mode),
                " ",
                react_1.default.createElement(icon_check_1.default, { visible: props.value === mode }))));
    };
    return (react_1.default.createElement("div", { className: "input-group", style: {
            display: 'inline-block',
            width: 'unset',
            marginLeft: '5px',
            marginBottom: '12px',
        } },
        react_1.default.createElement("button", { type: "button", className: "btn btn-primary dropdown-toggle", "data-bs-toggle": "dropdown", "aria-expanded": "false" },
            "Display Mode",
            react_1.default.createElement("span", { style: { fontSize: '12px', marginLeft: '4px' } },
                "(",
                displayModeName(props.value),
                ")")),
        react_1.default.createElement("ul", { className: "dropdown-menu" },
            createModeItem(DisplayMode.SingleGrid, true),
            createModeItem(DisplayMode.Grid, true),
            createModeItem(DisplayMode.CompactGrid, true),
            createModeItem(DisplayMode.List, listEnabled),
            createModeItem(DisplayMode.SmallList, listEnabled),
            createModeItem(DisplayMode.Details, detailsEnabled),
            createModeItem(DisplayMode.SmallDetails, detailsEnabled),
            createModeItem(DisplayMode.Text, textEnabled),
            createModeItem(DisplayMode.TextIDs, textEnabled))));
}
exports.default = DisplayDropdown;
//# sourceMappingURL=display_dropdown.js.map