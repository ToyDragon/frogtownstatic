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
    var _a = react_1.useState([]), mapValues = _a[0], setMapValues = _a[1];
    if (mapValues.length === 0) {
        props.loader.getMapData(props.map).then(function (mapData) {
            var seenValues = {};
            var allValues = [];
            for (var id in mapData) {
                var values = mapData[id];
                if (typeof values === 'string') {
                    values = [values];
                }
                for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                    var value = values_1[_i];
                    if (!value ||
                        value === 'undefined' ||
                        seenValues[value] ||
                        (props.bannedValues && props.bannedValues[value])) {
                        continue;
                    }
                    seenValues[value] = true;
                    allValues.push(value);
                }
            }
            setMapValues(allValues);
        });
    }
    var map = props.loader.getMapDataSync(props.map);
    var toggleValue = function (value) {
        return function () {
            var newValue = {
                mode: props.value.mode,
                values: {},
                no_others: props.value.no_others,
            };
            // Copy values from old data forward.
            if (props.multiSelect) {
                for (var key in props.value.values) {
                    newValue.values[key] = true;
                }
            }
            else {
                if (props.value.values[value]) {
                    newValue.values[value] = true;
                }
            }
            // Toggle the specified key.
            if (newValue.values[value]) {
                delete newValue.values[value];
            }
            else {
                newValue.values[value] = true;
            }
            props.setValue(newValue);
        };
    };
    var setMode = function (mode) {
        return function () {
            props.setValue({
                mode: mode,
                values: props.value.values,
                no_others: props.value.no_others,
            });
        };
    };
    return (react_1.default.createElement("div", { className: "input-group", style: {
            display: props.visible ? 'inline-block' : 'none',
            width: 'unset',
            marginLeft: '5px',
            marginBottom: '12px',
        } },
        react_1.default.createElement("button", { type: "button", className: "btn btn-light dropdown-toggle", "data-bs-toggle": "dropdown", "aria-expanded": "false", disabled: mapValues.length === 0 },
            props.children,
            (function () {
                if (props.categories) {
                    return props.categories.map(function (category) {
                        return props.value.values[category.value] ?
                            react_1.default.createElement("span", { key: category.value, style: { fontSize: '12px', marginLeft: '4px', textTransform: 'capitalize' } },
                                "(",
                                category.display,
                                ")") :
                            null;
                    });
                }
                if (map) {
                    return mapValues.map(function (value) {
                        return props.value.values[value] ?
                            react_1.default.createElement("span", { key: value, style: { fontSize: '12px', marginLeft: '4px', textTransform: 'capitalize' } },
                                "(",
                                value,
                                ")") :
                            null;
                    });
                }
                return null;
            })()),
        react_1.default.createElement("ul", { className: "dropdown-menu" },
            (function () {
                if (props.categories) {
                    return props.categories.map(function (category) {
                        return react_1.default.createElement("li", { key: category.value },
                            react_1.default.createElement("a", { className: "dropdown-item", href: "#", onMouseUp: toggleValue(category.value), style: {
                                    textTransform: 'capitalize',
                                } },
                                category.display,
                                " ",
                                react_1.default.createElement(icon_check_1.default, { visible: !!props.value.values[category.value] })));
                    });
                }
                if (map) {
                    return mapValues.map(function (value) {
                        return react_1.default.createElement("li", { key: value },
                            react_1.default.createElement("a", { className: "dropdown-item", href: "#", onMouseUp: toggleValue(value), style: {
                                    textTransform: 'capitalize',
                                } },
                                value,
                                " ",
                                react_1.default.createElement(icon_check_1.default, { visible: !!props.value.values[value] })));
                    });
                }
                return null;
            })(),
            !props.multiSelect ? null : react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("li", null,
                    react_1.default.createElement("hr", { className: "dropdown-divider" })),
                react_1.default.createElement("li", { key: "mode_all" },
                    react_1.default.createElement("a", { className: "dropdown-item", href: "#", onMouseUp: setMode('all') },
                        "All Selected",
                        react_1.default.createElement(icon_check_1.default, { visible: props.value.mode === 'all' }))),
                react_1.default.createElement("li", { key: "mode_any" },
                    react_1.default.createElement("a", { className: "dropdown-item", href: "#", onMouseUp: setMode('any') },
                        "Any Selected ",
                        react_1.default.createElement(icon_check_1.default, { visible: props.value.mode === 'any' }))),
                react_1.default.createElement("li", { key: "mode_others" },
                    react_1.default.createElement("a", { className: "dropdown-item", href: "#", onMouseUp: function () {
                            props.setValue({
                                mode: props.value.mode,
                                values: props.value.values,
                                no_others: !props.value.no_others,
                            });
                        } },
                        "No Others ",
                        react_1.default.createElement(icon_check_1.default, { visible: props.value.no_others })))))));
}
exports.default = FilterMapCategory;
//# sourceMappingURL=filter_map_category.js.map