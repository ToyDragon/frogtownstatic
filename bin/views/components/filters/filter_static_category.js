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
var icon_check_1 = __importDefault(require("../../bootstrap_icons/icon_check"));
function FilterMapCategory(props) {
    var _a = react_1.useState(true), disabled = _a[0], setDisabled = _a[1];
    if (disabled) {
        props.loader.getMapData(props.map).then(function () {
            setDisabled(false);
        });
    }
    var map = props.loader.getMapDataSync(props.map);
    var toggleValue = function (value) {
        return function () {
            var newValue = {};
            for (var key in props.value) {
                newValue[key] = props.value[key];
            }
            newValue[value] = !newValue[value];
            props.setValue(newValue);
        };
    };
    var seenValues = {};
    return (react_1.default.createElement("div", { className: "input-group", style: {
            display: props.visible ? "inline-block" : "none",
            width: "unset",
            marginLeft: "5px",
        } },
        react_1.default.createElement("button", { type: "button", className: "btn btn-secondary dropdown-toggle", "data-bs-toggle": "dropdown", "aria-expanded": "false", disabled: disabled }, props.children),
        react_1.default.createElement("ul", { className: "dropdown-menu" }, !map ? null : Object.values(map).map(function (value) {
            if (seenValues[value]) {
                return null;
            }
            seenValues[value] = true;
            return react_1.default.createElement("li", { key: value },
                react_1.default.createElement("a", { className: "dropdown-item", href: "#", onMouseUp: toggleValue(value), style: {
                        textTransform: "capitalize"
                    } },
                    value,
                    " ",
                    react_1.default.createElement(icon_check_1.default, { visible: !!props.value[value] })));
        }))));
}
exports.default = FilterMapCategory;
//# sourceMappingURL=filter_static_category.js.map