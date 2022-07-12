"use strict";
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
var icon_check_1 = __importDefault(require("../bootstrap_icons/icon_check"));
/* eslint-disable no-unused-vars */
var Grouper;
(function (Grouper) {
    Grouper[Grouper["Color"] = 0] = "Color";
    Grouper[Grouper["Type"] = 1] = "Type";
    Grouper[Grouper["CMC"] = 2] = "CMC";
})(Grouper = exports.Grouper || (exports.Grouper = {}));
;
/* eslint-enable no-unused-vars */
function GrouperDropdown(props) {
    var _a = react_1.useState(false), colorEnabled = _a[0], setColorEnabled = _a[1];
    var _b = react_1.useState(false), typeEnabled = _b[0], setTypeEnabled = _b[1];
    var _c = react_1.useState(false), cmcEnabled = _c[0], setCMCEnabled = _c[1];
    react_1.useEffect(function () {
        props.loader.getMapData('IDToColor').then(function () {
            setColorEnabled(true);
        });
        props.loader.getMapData('IDToType').then(function () {
            setTypeEnabled(true);
        });
        props.loader.getMapData('IDToCMC').then(function () {
            setCMCEnabled(true);
        });
    }, []);
    var createGrouperItem = function (grouper, enabled) {
        return (react_1.default.createElement("li", { key: grouper, style: {
                backgroundColor: enabled ? 'transparent' : 'lightgray',
            } },
            react_1.default.createElement("a", { className: "dropdown-item", href: "#", onMouseUp: function () {
                    if (enabled) {
                        if (props.value === grouper) {
                            props.setValue(null);
                        }
                        else {
                            props.setValue(grouper);
                        }
                    }
                } },
                Grouper[grouper],
                " ",
                react_1.default.createElement(icon_check_1.default, { visible: props.value === grouper }))));
    };
    return (react_1.default.createElement("div", { className: "input-group", style: {
            display: 'inline-block',
            width: 'unset',
            marginLeft: '5px',
            marginBottom: '12px',
        } },
        react_1.default.createElement("button", { type: "button", className: "btn btn-primary dropdown-toggle", "data-bs-toggle": "dropdown", "aria-expanded": "false" },
            "Grouper",
            react_1.default.createElement("span", { style: { fontSize: '12px', marginLeft: '4px' } },
                "(",
                typeof props.value === 'number' ? Grouper[props.value] : 'none',
                ")")),
        react_1.default.createElement("ul", { className: "dropdown-menu" },
            createGrouperItem(Grouper.Color, colorEnabled),
            createGrouperItem(Grouper.Type, typeEnabled),
            createGrouperItem(Grouper.CMC, cmcEnabled))));
}
exports.default = GrouperDropdown;
//# sourceMappingURL=grouper_dropdown.js.map