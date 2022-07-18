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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
function ChooseStorageWindow(props) {
    var _this = this;
    var _a = (0, react_1.useState)(true), isOpen = _a[0], setIsOpen = _a[1];
    (0, react_1.useEffect)(function () {
        var styleEle = document.createElement('style');
        styleEle.innerHTML = "\n      .storageWindow {\n        background-color: white;\n      }\n      .highlightHover:hover {\n        background-color: lightblue;\n      }\n    ";
        document.querySelector('body').append(styleEle);
    }, []);
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
                position: 'absolute',
                top: 'calc(50% - 300px)',
                left: 'calc(50% - 506px)',
                width: '1012px',
                fontSize: '24px',
            } },
            react_1.default.createElement("div", { className: 'storageWindow ' + (!!window.showDirectoryPicker ? 'highlightHover' : ''), style: {
                    display: 'inline-block',
                    width: '500px',
                    height: '600px',
                    borderRadius: '12px',
                    border: '3px solid #cdd6e4',
                    padding: '12px',
                    verticalAlign: 'top',
                    position: 'relative',
                }, onMouseUp: function (e) { var e_1, _a; return __awaiter(_this, void 0, void 0, function () {
                    var dir, hasMetadataFile, metadatafile, contents, _b, fileCount, _c, _d, _e, key, value, e_1_1, approvedFolder;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                if (!(e.button === 0 && !!window.showDirectoryPicker)) return [3 /*break*/, 23];
                                return [4 /*yield*/, window.showDirectoryPicker()];
                            case 1:
                                dir = _f.sent();
                                console.log('Chose directory: ', dir);
                                hasMetadataFile = false;
                                _f.label = 2;
                            case 2:
                                _f.trys.push([2, 6, , 7]);
                                return [4 /*yield*/, dir.getFileHandle('frogtown_metadata.json')];
                            case 3:
                                metadatafile = _f.sent();
                                return [4 /*yield*/, metadatafile.getFile()];
                            case 4: return [4 /*yield*/, (_f.sent()).text()];
                            case 5:
                                contents = _f.sent();
                                console.log('Metadata file contents: ' + contents);
                                if (contents) {
                                    hasMetadataFile = true;
                                }
                                return [3 /*break*/, 7];
                            case 6:
                                _b = _f.sent();
                                return [3 /*break*/, 7];
                            case 7:
                                if (!!hasMetadataFile) return [3 /*break*/, 22];
                                fileCount = 0;
                                _f.label = 8;
                            case 8:
                                _f.trys.push([8, 13, 14, 19]);
                                _c = __asyncValues(dir.entries());
                                _f.label = 9;
                            case 9: return [4 /*yield*/, _c.next()];
                            case 10:
                                if (!(_d = _f.sent(), !_d.done)) return [3 /*break*/, 12];
                                _e = _d.value, key = _e[0], value = _e[1];
                                fileCount++;
                                console.log('Folder contains', key, value);
                                _f.label = 11;
                            case 11: return [3 /*break*/, 9];
                            case 12: return [3 /*break*/, 19];
                            case 13:
                                e_1_1 = _f.sent();
                                e_1 = { error: e_1_1 };
                                return [3 /*break*/, 19];
                            case 14:
                                _f.trys.push([14, , 17, 18]);
                                if (!(_d && !_d.done && (_a = _c.return))) return [3 /*break*/, 16];
                                return [4 /*yield*/, _a.call(_c)];
                            case 15:
                                _f.sent();
                                _f.label = 16;
                            case 16: return [3 /*break*/, 18];
                            case 17:
                                if (e_1) throw e_1.error;
                                return [7 /*endfinally*/];
                            case 18: return [7 /*endfinally*/];
                            case 19:
                                approvedFolder = true;
                                if (!(fileCount > 0)) return [3 /*break*/, 21];
                                console.log('No metadata, confirming choice');
                                return [4 /*yield*/, props.confirmationWindow.current.open("Folder \"".concat(dir.name, "\" doesn't look right, you should pick a different folder."), "This folder contains ".concat(fileCount, " existing files/directories, you\n                    should cancel, and create or pick an empty folder."), 'Use This Folder')];
                            case 20:
                                approvedFolder = _f.sent();
                                _f.label = 21;
                            case 21:
                                if (approvedFolder) {
                                    props.storageChosen(false, dir);
                                    setIsOpen(false);
                                }
                                return [3 /*break*/, 23];
                            case 22:
                                console.log('Metadata file present, moving forward with directory.');
                                props.storageChosen(false, dir);
                                setIsOpen(false);
                                _f.label = 23;
                            case 23: return [2 /*return*/];
                        }
                    });
                }); } },
                react_1.default.createElement("h1", null, "Store In Folder"),
                !!window.showDirectoryPicker ? null :
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("div", { style: { padding: '12px', color: 'darkred', fontSize: '24px' } }, "NOT SUPPORTED IN YOUR BROWSER"),
                        react_1.default.createElement("div", { style: { paddingLeft: '12px', paddingRight: '12px', color: 'darkred' } },
                            "Try a ",
                            react_1.default.createElement("a", { href: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/showDirectoryPicker#browser_compatibility', target: '_blank', rel: 'noreferrer' }, "supported browser"),
                            ", like chrome.")),
                react_1.default.createElement("div", { style: { padding: '12px' } }, "When decks are stored in a folder on your computer, it's a lot harder\n          to accidentally lose them."),
                react_1.default.createElement("div", { style: { marginTop: '12px' } }),
                react_1.default.createElement("div", { style: { padding: '12px' } }, "Create a folder called \"Frogtown Decks\" or something similar on your\n          computer, and choose it when the folder selector appears."),
                react_1.default.createElement("div", { style: { fontSize: '48px', fontWeight: 'bolder', color: 'darkgreen', position: 'absolute',
                        bottom: '0', left: '63px' } }, "RECOMMENDED")),
            react_1.default.createElement("div", { className: 'storageWindow highlightHover', style: {
                    display: 'inline-block',
                    marginLeft: '12px',
                    width: '500px',
                    height: '600px',
                    borderRadius: '12px',
                    border: '3px solid #cdd6e4',
                    padding: '12px',
                    verticalAlign: 'top',
                    position: 'relative',
                }, onMouseUp: function (e) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (e.button === 0) {
                            props.storageChosen(true, null);
                            setIsOpen(false);
                        }
                        return [2 /*return*/];
                    });
                }); } },
                react_1.default.createElement("h1", null, "Store In Browser Cache"),
                react_1.default.createElement("div", { style: { padding: '12px' } }, "When decks are stored in your browser directly, they can be accidentally\n          lost when clearing your browsers cache. Also, they are difficult to back up and restore if something\n          goes wrong."),
                react_1.default.createElement("div", { style: { fontSize: '48px', fontWeight: 'bolder', color: 'darkred', position: 'absolute',
                        bottom: '0', left: '99px' } }, "DONT DO IT"))));
}
exports.default = ChooseStorageWindow;
;
//# sourceMappingURL=choose_storage_window.js.map