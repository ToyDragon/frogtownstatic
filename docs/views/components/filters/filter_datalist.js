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
function FilterDatalist(props) {
    var _a = react_1.useState([]), mapValues = _a[0], setMapValues = _a[1];
    if (mapValues.length === 0) {
        var mapPromises = [];
        mapPromises.push(props.loader.getMapData(props.map));
        for (var _i = 0, _b = props.otherRequiredMaps; _i < _b.length; _i++) {
            var map = _b[_i];
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
    }
    var id = react_1.useId();
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