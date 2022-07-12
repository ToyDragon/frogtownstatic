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
var icon_search_1 = __importDefault(require("../../bootstrap_icons/icon_search"));
function FilterText(props) {
    var _a = react_1.useState(true), disabled = _a[0], setDisabled = _a[1];
    if (disabled) {
        var mapPromises = [];
        for (var _i = 0, _b = props.maps; _i < _b.length; _i++) {
            var map = _b[_i];
            mapPromises.push(props.loader.getAnyMapData(map));
        }
        Promise.all(mapPromises).then(function () {
            setDisabled(false);
        });
    }
    console.log("Rendering name filter value " + props.value + " disabled " + disabled);
    return (react_1.default.createElement("div", { style: {
            display: "inlineBlock",
            width: "250px",
            verticalAlign: "top",
            marginBottom: "12px",
            fontSize: "16px",
        } },
        react_1.default.createElement("div", { className: "input-group" },
            react_1.default.createElement("div", { className: "input-group-text" },
                react_1.default.createElement(icon_search_1.default, null),
                "\u00A0Name"),
            react_1.default.createElement("input", { type: "text", className: "form-control", value: props.value, disabled: disabled, onChange: function (e) {
                    console.log("Value changes to " + e.target.value);
                    props.setValue(e.target.value);
                } }))));
}
exports.default = FilterText;
//# sourceMappingURL=filter_name.js.map