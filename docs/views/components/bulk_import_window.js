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
exports.parseCards = void 0;
var react_1 = __importStar(require("react"));
var execute_filter_1 = require("../../data/execute_filter");
function parseCards(loader, input) {
    var _a, _b;
    var result = {
        ids: [],
        errors: [],
    };
    var idToName = loader.getMapDataSync('IDToName');
    var idToSetCode = loader.getMapDataSync('IDToSetCode');
    // TODO: supporting parens as a set delimiter means we can't directly search for cards with parens
    // in their names. Only like 5 of these exist, but may cause issues in the future.
    var nameRegex = /([0-9]+)?x?\s*([^<>\[\]()]*)\s*(?:[<\[(](.*)[>\])])?\s*/;
    var idRegex = /([0-9]+)?x?\s*([0-9a-z]){36}\s*(?:\/\/.*)?/;
    var uniqueErrors = {};
    var namesToMatch = [];
    for (var _i = 0, _c = input.split('\n'); _i < _c.length; _i++) {
        var line = _c[_i];
        var matchResult = idRegex.exec(line);
        if (matchResult && ((_a = matchResult[2]) === null || _a === void 0 ? void 0 : _a.length)) {
            if (idToName[matchResult[2]]) {
                var quantity = Number(matchResult[1]) || 1;
                for (var i = 0; i < quantity; i++) {
                    result.ids.push(matchResult[2]);
                }
            }
            else {
                uniqueErrors["ID \"".concat(matchResult[2], "\" not found.")] = true;
            }
            continue;
        }
        matchResult = nameRegex.exec(line);
        if (matchResult && ((_b = matchResult[2]) === null || _b === void 0 ? void 0 : _b.length)) {
            namesToMatch.push({
                text: matchResult[2].trim(),
                matchedId: '',
                matchedName: '',
                matchedNameRank: 0,
                quantity: Number(matchResult[1] || 1),
                setCode: (matchResult[3] || '').toLowerCase(),
            });
            continue;
        }
    }
    for (var id in idToName) {
        var name_1 = idToName[id];
        for (var _d = 0, namesToMatch_1 = namesToMatch; _d < namesToMatch_1.length; _d++) {
            var info = namesToMatch_1[_d];
            if (info.setCode && idToSetCode[id] !== info.setCode) {
                continue;
            }
            var rank = (0, execute_filter_1.rankStringMatch)(name_1, info.text);
            if (rank > 0 && (info.matchedName === '' || info.matchedNameRank > rank)) {
                info.matchedId = id;
                info.matchedName = name_1;
                info.matchedNameRank = rank;
            }
        }
    }
    for (var _e = 0, namesToMatch_2 = namesToMatch; _e < namesToMatch_2.length; _e++) {
        var info = namesToMatch_2[_e];
        if (!info.matchedName) {
            uniqueErrors["Card \"".concat(info.text, "\" not found.")] = true;
            continue;
        }
        if (info.matchedNameRank > 2) {
            uniqueErrors["Card \"".concat(info.text, "\" not found, maybe \"").concat(info.matchedName, "\"?")] = true;
            continue;
        }
        for (var i = 0; i < info.quantity; i++) {
            result.ids.push(info.matchedId);
        }
    }
    result.errors = Object.keys(uniqueErrors);
    return result;
}
exports.parseCards = parseCards;
var BulkImportWindow = (0, react_1.forwardRef)(function BulkImportWindow(props, ref) {
    var _a = (0, react_1.useState)(''), inputValue = _a[0], setInputValue = _a[1];
    var _b = (0, react_1.useState)([]), errors = _b[0], setErrors = _b[1];
    var _c = (0, react_1.useState)(false), isOpen = _c[0], setIsOpen = _c[1];
    var inputRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        open: function () {
            setInputValue('');
            setIsOpen(true);
            setErrors([]);
            setTimeout(function () { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.select(); }, 0);
        },
    }); });
    if (!isOpen) {
        return null;
    }
    var submit = function (submitFromKey) {
        return function (e) {
            if (typeof e !== 'undefined' &&
                typeof e.key !== 'undefined' &&
                (submitFromKey || (e.key !== ' ' && e.key !== 'Enter'))) {
                if (e.key === 'Escape') {
                    setIsOpen(false);
                }
                return;
            }
            var result = parseCards(props.loader, inputValue);
            if (result.errors.length > 0) {
                setErrors(result.errors);
                return;
            }
            if (result.ids.length === 0) {
                setErrors(["No cards entered."]);
                return;
            }
            props.addCards(result.ids);
            setIsOpen(false);
        };
    };
    return react_1.default.createElement("div", { style: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            backgroundColor: '#00000070',
            zIndex: '6',
        }, onMouseUp: function () {
            setIsOpen(false);
        } },
        react_1.default.createElement("div", { style: {
                width: '600px',
                height: '750px',
                position: 'absolute',
                left: 'calc(50% - 300px)',
                top: 'calc(50% - 375px)',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '3px solid #cdd6e4',
                padding: '16px',
            }, onMouseUp: function (e) { return e.stopPropagation(); } },
            react_1.default.createElement("div", { style: {
                    fontSize: '24px',
                } }, "Bulk Import"),
            react_1.default.createElement("div", { style: {
                    fontSize: '16px',
                    color: 'darkgray',
                } }, 'Enter cards by name like "Island", and optionally include count or setcode like "20 Island <pana>"'),
            react_1.default.createElement("textarea", { ref: inputRef, style: {
                    fontSize: '18px',
                    width: '100%',
                    height: '475px',
                    resize: 'none',
                }, value: inputValue, onChange: function (e) { return setInputValue(e.target.value); }, onKeyDown: submit(true) }),
            react_1.default.createElement("div", { style: { marginTop: '12px' } },
                react_1.default.createElement("div", { style: {
                        display: 'inline-block',
                        color: 'red',
                        fontWeight: 'bold',
                        width: '380px',
                        height: '120px',
                        overflowY: 'auto',
                    } }, errors.map(function (a) { return (react_1.default.createElement("div", { key: a }, a)); })),
                react_1.default.createElement("button", { className: 'btn btn-secondary', onMouseUp: function () { return setIsOpen(false); } }, "Cancel"),
                react_1.default.createElement("button", { style: { marginLeft: '32px' }, className: 'btn btn-primary', onMouseUp: submit(false), onKeyDown: submit(false) }, "Submit"))));
});
exports.default = BulkImportWindow;
//# sourceMappingURL=bulk_import_window.js.map