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
var ConfirmDeleteWindow = (0, react_1.forwardRef)(function ConfirmDeleteWindow(props, ref) {
    var _a = (0, react_1.useState)(''), deckName = _a[0], setDeckName = _a[1];
    var _b = (0, react_1.useState)(false), isOpen = _b[0], setIsOpen = _b[1];
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        open: function (deckName) {
            setDeckName(deckName);
            setIsOpen(true);
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
            zIndex: '6',
        }, onMouseUp: function (e) {
            if (e.button === 0) {
                setIsOpen(false);
            }
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
                } }, "Delete Deck \"".concat(deckName, "\"?")),
            react_1.default.createElement("div", { style: { marginLeft: '383px', marginTop: '51px' } },
                react_1.default.createElement("button", { className: 'btn btn-secondary', onMouseUp: function (e) {
                        if (e.button === 0) {
                            setIsOpen(false);
                        }
                    }, onKeyDown: function (e) {
                        if (e.key === 'Enter' || e.key === ' ') {
                            setIsOpen(false);
                        }
                    } }, "Cancel"),
                react_1.default.createElement("button", { style: { marginLeft: '32px' }, className: 'btn btn-primary', onMouseUp: function (e) {
                        if (e.button === 0) {
                            props.deleteConfirmed();
                            setIsOpen(false);
                        }
                    }, onKeyDown: function (e) {
                        if (e.key === 'Enter' || e.key === ' ') {
                            props.deleteConfirmed();
                            setIsOpen(false);
                        }
                    } }, "Delete"))));
});
exports.default = ConfirmDeleteWindow;
//# sourceMappingURL=confirm_delete_window.js.map