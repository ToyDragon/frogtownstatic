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
var EditNameWindow = react_1.forwardRef(function EditNameWindow(props, ref) {
    var _a = react_1.useState(''), inputValue = _a[0], setInputValue = _a[1];
    var _b = react_1.useState(''), errorText = _b[0], setErrorText = _b[1];
    var _c = react_1.useState(false), isOpen = _c[0], setIsOpen = _c[1];
    var inputRef = react_1.useRef(null);
    react_1.useImperativeHandle(ref, function () { return ({
        open: function (newValue) {
            setInputValue(newValue);
            setIsOpen(true);
            setTimeout(function () { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.select(); }, 0);
        },
    }); });
    if (!isOpen) {
        return null;
    }
    var submit = function (allowSpace) {
        return function (e) {
            if (typeof e !== 'undefined' &&
                typeof e.key !== 'undefined' &&
                e.key !== 'Enter' &&
                (allowSpace || e.key !== ' ')) {
                if (e.key === 'Escape') {
                    setIsOpen(false);
                }
                setErrorText('');
                return;
            }
            if (inputValue.trim().length === 0) {
                setErrorText('Invalid name.');
                return;
            }
            props.nameChanged(inputValue);
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
                height: '160px',
                position: 'absolute',
                left: 'calc(50% - 300px)',
                top: 'calc(50% - 80px)',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '3px solid #cdd6e4',
                padding: '16px',
            }, onMouseUp: function (e) { return e.stopPropagation(); } },
            react_1.default.createElement("div", { style: {
                    fontSize: '24px',
                } }, "New Name"),
            react_1.default.createElement("input", { ref: inputRef, style: {
                    fontSize: '24px',
                    width: '100%',
                }, type: 'text', value: inputValue, onChange: function (e) { return setInputValue(e.target.value); }, onKeyDown: submit(true) }),
            react_1.default.createElement("div", { style: { marginTop: '12px' } },
                react_1.default.createElement("span", { style: {
                        display: 'inline-block',
                        color: 'red',
                        fontWeight: 'bold',
                        width: '380px',
                    } }, errorText),
                react_1.default.createElement("button", { className: 'btn btn-secondary', onMouseUp: function () { return setIsOpen(false); } }, "Cancel"),
                react_1.default.createElement("button", { style: { marginLeft: '32px' }, className: 'btn btn-primary', onMouseUp: submit(false), onKeyDown: submit(false) }, "Submit"))));
});
exports.default = EditNameWindow;
//# sourceMappingURL=edit_name_window.js.map