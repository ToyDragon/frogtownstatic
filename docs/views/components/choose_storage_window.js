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
                }, onMouseUp: function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var dir, hasMetadataFile, metadatafile, contents, _a, approvedFolder;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!(e.button === 0 && !!window.showDirectoryPicker)) return [3 /*break*/, 10];
                                return [4 /*yield*/, window.showDirectoryPicker()];
                            case 1:
                                dir = _b.sent();
                                console.log('Chose directory: ', dir);
                                hasMetadataFile = false;
                                _b.label = 2;
                            case 2:
                                _b.trys.push([2, 6, , 7]);
                                return [4 /*yield*/, dir.getFileHandle('frogtown_metadata.json')];
                            case 3:
                                metadatafile = _b.sent();
                                return [4 /*yield*/, metadatafile.getFile()];
                            case 4: return [4 /*yield*/, (_b.sent()).text()];
                            case 5:
                                contents = _b.sent();
                                console.log('Metadata file contents: ' + contents);
                                if (contents) {
                                    hasMetadataFile = true;
                                }
                                return [3 /*break*/, 7];
                            case 6:
                                _a = _b.sent();
                                return [3 /*break*/, 7];
                            case 7:
                                if (!!hasMetadataFile) return [3 /*break*/, 9];
                                console.log('No metadata, confirming choice');
                                return [4 /*yield*/, props.confirmationWindow.current.open("Folder \"".concat(dir.name, "\" has no Frogtown metadata file, are you sure you want to use this folder?"), 'This is normal if this is a new folder that you have never used before.', 'Use This Folder')];
                            case 8:
                                approvedFolder = _b.sent();
                                if (approvedFolder) {
                                    props.storageChosen(false, dir);
                                    setIsOpen(false);
                                }
                                return [3 /*break*/, 10];
                            case 9:
                                console.log('Metadata file present, moving forward with directory.');
                                props.storageChosen(false, dir);
                                setIsOpen(false);
                                _b.label = 10;
                            case 10: return [2 /*return*/];
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