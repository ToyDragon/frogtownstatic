"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
function FilterNumberRange(props) {
    var _a = react_1.useState(true), disabled = _a[0], setDisabled = _a[1];
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
    return (react_1.default.createElement("div", { style: {
            display: props.visible ? "inline-block" : "none",
            width: "250px",
            verticalAlign: "top",
            marginBottom: "12px",
            fontSize: "16px",
            marginLeft: "5px",
        } },
        react_1.default.createElement("div", { className: "input-group" },
            react_1.default.createElement("div", { className: "input-group-text" }, props.children),
            react_1.default.createElement("input", { type: "text", placeholder: "2-3", className: "form-control", value: props.value, disabled: disabled, onChange: function (e) {
                    props.setValue(e.target.value);
                } }))));
}
exports.default = FilterNumberRange;
//# sourceMappingURL=filter_number_range.js.map