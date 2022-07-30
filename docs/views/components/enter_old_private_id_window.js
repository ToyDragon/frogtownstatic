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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var EditNameWindow = (0, react_1.forwardRef)(function EditNameWindow(props, ref) {
    var _this = this;
    var _a = (0, react_1.useState)(''), inputValue = _a[0], setInputValue = _a[1];
    var _b = (0, react_1.useState)(''), errorText = _b[0], setErrorText = _b[1];
    var _c = (0, react_1.useState)(false), isOpen = _c[0], setIsOpen = _c[1];
    var inputRef = (0, react_1.useRef)(null);
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        open: function () {
            setInputValue('');
            setIsOpen(true);
            setTimeout(function () { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.select(); }, 0);
        },
    }); });
    if (!isOpen) {
        return null;
    }
    var submit = function (allowSpace) {
        return function (e) { return __awaiter(_this, void 0, void 0, function () {
            var enteredId, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof e !== 'undefined' &&
                            typeof e.key !== 'undefined' &&
                            e.key !== 'Enter' &&
                            (allowSpace || e.key !== ' ')) {
                            if (e.key === 'Escape') {
                                setIsOpen(false);
                            }
                            setErrorText('');
                            return [2 /*return*/];
                        }
                        enteredId = inputValue.trim();
                        if (enteredId.length !== 64) {
                            setErrorText('Not a private Id.');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, props.urlLoader.load("https://s3.us-west-2.amazonaws.com/frogtown.userdecklists/".concat(enteredId, ".txt"))];
                    case 1:
                        data = _a.sent();
                        if (!data || data.length != 24) {
                            setErrorText('Not a private Id.');
                            return [2 /*return*/];
                        }
                        props.idEntered(data);
                        setIsOpen(false);
                        return [2 /*return*/];
                }
            });
        }); };
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
                } }, "Legacy Private ID"),
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
                react_1.default.createElement("button", { style: { marginLeft: '32px' }, className: 'btn btn-primary', onMouseUp: submit(false), onKeyDown: submit(false) }, "Import"))));
});
exports.default = EditNameWindow;
//# sourceMappingURL=enter_old_private_id_window.js.map