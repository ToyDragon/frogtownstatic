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
function FilterDatalist(props) {
    var _a = (0, react_1.useState)([]), mapValues = _a[0], setMapValues = _a[1];
    (0, react_1.useEffect)(function () {
        var mapPromises = [];
        mapPromises.push(props.loader.getMapData(props.map));
        for (var _i = 0, _a = props.otherRequiredMaps; _i < _a.length; _i++) {
            var map = _a[_i];
            mapPromises.push(props.loader.getMapData(map));
        }
        Promise.all(mapPromises).then(function () {
            var mapData = props.loader.getMapDataSync(props.map);
            if (!mapData) {
                return;
            }
            var allValues = [];
            for (var id_1 in mapData) {
                allValues.push({
                    value: id_1,
                    display: mapData[id_1],
                });
            }
            setMapValues(allValues);
        });
    }, []);
    var id = (0, react_1.useId)();
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
            react_1.default.createElement("datalist", { id: id }, mapValues.map(function (val) {
                return react_1.default.createElement("option", { key: val.value, value: val.value }, val.display);
            })),
            react_1.default.createElement("input", { type: "text", list: id, className: "form-control", disabled: mapValues.length === 0, onChange: function (e) {
                    props.setValue(e.target.value);
                } }))));
}
exports.default = FilterDatalist;
//# sourceMappingURL=filter_datalist.js.map