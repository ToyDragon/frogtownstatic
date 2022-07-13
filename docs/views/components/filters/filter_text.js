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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
function FilterText(props) {
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
    return (react_1.default.createElement("div", { style: {
            display: props.visible ? 'inline-block' : 'none',
            width: '250px',
            verticalAlign: 'top',
            marginBottom: '12px',
            fontSize: '16px',
            marginLeft: '5px',
        } },
        react_1.default.createElement("div", { className: "input-group" },
            react_1.default.createElement("div", { className: "input-group-text" }, props.children),
            react_1.default.createElement("input", { type: "text", className: "form-control", value: props.value, disabled: disabled, placeholder: props.placeholder || '', onChange: function (e) {
                    props.setValue(e.target.value);
                } }))));
}
exports.default = FilterText;
//# sourceMappingURL=filter_text.js.map