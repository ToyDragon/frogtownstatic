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
var SettingsWindow = (0, react_1.forwardRef)(function SettingsWindow(props, ref) {
    var _a = (0, react_1.useState)(''), inputValue = _a[0], setInputValue = _a[1];
    var _b = (0, react_1.useState)([]), existingUrls = _b[0], setExistingUrls = _b[1];
    var _c = (0, react_1.useState)([]), errors = _c[0], setErrors = _c[1];
    var _d = (0, react_1.useState)(false), isOpen = _d[0], setIsOpen = _d[1];
    var inputRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        open: function (existingUrls, backgroundUrl) {
            console.log('Set existing urls to ', existingUrls);
            setExistingUrls(existingUrls);
            setInputValue(backgroundUrl || '');
            setIsOpen(true);
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
                e.key !== 'Enter' &&
                (submitFromKey || e.key !== ' ')) {
                if (e.key === 'Escape') {
                    setIsOpen(false);
                }
                setErrors([]);
                return;
            }
            props.setBackgroundUrl(inputValue);
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
                width: '800px',
                height: '800px',
                position: 'absolute',
                left: 'calc(50% - 400px)',
                top: 'calc(50% - 400px)',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '3px solid #cdd6e4',
                padding: '16px',
            }, onMouseUp: function (e) { return e.stopPropagation(); } },
            react_1.default.createElement("div", { style: {} },
                react_1.default.createElement("div", { style: {
                        display: 'inline-block',
                        width: '223px',
                        height: '312px',
                        backgroundSize: '100% 100%',
                        backgroundImage: "url(https://i.imgur.com/Hg8CwwU.jpeg)",
                    } },
                    react_1.default.createElement("div", { style: {
                            display: 'inline-block',
                            width: '223px',
                            height: '312px',
                            backgroundSize: '100% 100%',
                            backgroundImage: "url(".concat(inputValue, ")"),
                        } })),
                react_1.default.createElement("div", { style: {
                        width: 'calc(100% - 223px)',
                        display: 'inline-block',
                        verticalAlign: 'top',
                        paddingLeft: '6px',
                    } },
                    react_1.default.createElement("div", { style: {
                            fontSize: '24px',
                        } }, "Cardback Image"),
                    react_1.default.createElement("input", { ref: inputRef, type: 'text', style: {
                            fontSize: '18px',
                            width: 'calc(100% - 6px)',
                            resize: 'none',
                        }, value: inputValue, onChange: function (e) { return setInputValue(e.target.value); }, onKeyDown: submit(true) }),
                    react_1.default.createElement("div", { style: {
                            display: 'inline-block',
                            color: 'red',
                            fontWeight: 'bold',
                            width: '380px',
                            height: '120px',
                            overflowY: 'auto',
                        } }, errors.map(function (a) { return (react_1.default.createElement("div", { key: a }, a)); })))),
            react_1.default.createElement("div", { style: {
                    fontSize: '24px',
                } }, 'Other Decks\' Cardbacks'),
            react_1.default.createElement("div", { style: {
                    width: '100%',
                    overflowX: 'scroll',
                } },
                react_1.default.createElement("div", { style: {
                        whiteSpace: 'nowrap',
                    } }, existingUrls.map(function (url) {
                    return react_1.default.createElement("div", { key: url, style: {
                            display: 'inline-block',
                            width: '223px',
                            height: '312px',
                            marginLeft: '8px',
                            marginRight: '8px',
                            backgroundSize: '100% 100%',
                            backgroundImage: "url(".concat(url, ")"),
                        }, onMouseUp: function (e) {
                            if (e.button === 0) {
                                setInputValue(url);
                            }
                        } });
                }))),
            react_1.default.createElement("div", { style: { position: 'absolute', bottom: '12px', right: '12px' } },
                react_1.default.createElement("button", { className: 'btn btn-secondary', onMouseUp: function () { return setIsOpen(false); } }, "Cancel"),
                react_1.default.createElement("button", { style: { marginLeft: '32px' }, className: 'btn btn-primary', onMouseUp: submit(false), onKeyDown: submit(false) }, "Submit"))));
});
exports.default = SettingsWindow;
//# sourceMappingURL=settings_window.js.map