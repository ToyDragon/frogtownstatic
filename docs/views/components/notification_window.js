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
var NotificationWindow = (0, react_1.forwardRef)(function NotificationWindow(_props, ref) {
    var _a = (0, react_1.useState)(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = (0, react_1.useState)(''), title = _b[0], setTitle = _b[1];
    var _c = (0, react_1.useState)(''), message = _c[0], setMessage = _c[1];
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        open: function (title, message) {
            if (isOpen) {
                console.error('Tried to open two notification windows at the same time.');
                return;
            }
            setIsOpen(true);
            setTitle(title);
            setMessage(message);
        },
        close: function () {
            setIsOpen(false);
        },
    }); });
    if (!isOpen) {
        return null;
    }
    return react_1.default.createElement("div", { style: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            backgroundColor: '#00000070',
            zIndex: '7',
        } },
        react_1.default.createElement("div", { style: {
                width: '800px',
                height: '250px',
                position: 'absolute',
                left: 'calc(50% - 300px)',
                top: 'calc(50% - 125px)',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '3px solid #cdd6e4',
                padding: '16px',
            } },
            react_1.default.createElement("div", { style: { padding: '12px', fontSize: '36px' } }, title),
            react_1.default.createElement("div", { style: { fontSize: '24px' } }, message)));
});
exports.default = NotificationWindow;
//# sourceMappingURL=notification_window.js.map