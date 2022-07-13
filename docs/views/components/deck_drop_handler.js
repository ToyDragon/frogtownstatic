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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var debouncer_1 = __importDefault(require("../../data/debouncer"));
function DeckDropHandler(props) {
    var _this = this;
    var _a = (0, react_1.useState)(false), showingIndicator = _a[0], setShowingIndicator = _a[1];
    (0, react_1.useEffect)(function () {
        var debouncer = new debouncer_1.default(200, document);
        document.body.addEventListener('dragover', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document.body.classList.add('dragging');
                        return [4 /*yield*/, debouncer.waitAndShouldAct()];
                    case 1:
                        if (_a.sent()) {
                            document.body.classList.remove('dragging');
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        var styleEle = document.createElement('style');
        styleEle.innerHTML = "\n      .dragtarget {\n        pointer-events: none;\n      }\n      body.dragging .dragtarget {\n        pointer-events: all;\n      }",
            document.body.append(styleEle);
    }, []);
    return react_1.default.createElement("div", { className: "dragtarget", style: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            zIndex: '9999',
            top: '0',
            left: '0',
        }, onDrop: function (e) {
            setShowingIndicator(false);
            e.preventDefault();
            var idToLargeImageURI = props.loader.getMapDataSync('IDToLargeImageURI');
            if (!idToLargeImageURI) {
                return;
            }
            var filesToRead = [];
            if (e.dataTransfer.items) {
                for (var i = 0; i < e.dataTransfer.items.length; i++) {
                    if (e.dataTransfer.items[i].kind === 'file') {
                        var file = e.dataTransfer.items[i].getAsFile();
                        if (file && file.name.endsWith('.json')) {
                            filesToRead.push(file);
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < e.dataTransfer.files.length; i++) {
                    var file = e.dataTransfer.files[i];
                    if (file && file.name.endsWith('.json')) {
                        filesToRead.push(file);
                    }
                }
            }
            var fileReadPromises = [];
            var _loop_1 = function (file) {
                fileReadPromises.push(new Promise(function (resolve) {
                    var reader = new FileReader();
                    reader.readAsText(file);
                    reader.onloadend = function () {
                        var _a;
                        resolve({
                            name: file.name.replace(/\.json$/, ''),
                            contents: (((_a = reader.result) === null || _a === void 0 ? void 0 : _a.toString()) || ''),
                        });
                    };
                }));
            };
            for (var _i = 0, filesToRead_1 = filesToRead; _i < filesToRead_1.length; _i++) {
                var file = filesToRead_1[_i];
                _loop_1(file);
            }
            var idRegex = /([a-z0-9-]{36})/;
            Promise.all(fileReadPromises).then(function (fileDatas) {
                for (var _i = 0, fileDatas_1 = fileDatas; _i < fileDatas_1.length; _i++) {
                    var fileData = fileDatas_1[_i];
                    console.log('Parsing ' + fileData.name);
                    try {
                        var parsedDeck = JSON.parse(fileData.contents);
                        var mainboard = [];
                        var sideboard = [];
                        for (var _a = 0, _b = parsedDeck.ObjectStates; _a < _b.length; _a++) {
                            var stack = _b[_a];
                            var localIdToCount = {};
                            if (stack.ContainedObjects) {
                                for (var _c = 0, _d = stack.ContainedObjects; _c < _d.length; _c++) {
                                    var card = _d[_c];
                                    if (card.CardID % 100 !== 0) {
                                        throw new Error("Invalid card id ".concat(card.CardID));
                                    }
                                    var localId = Math.floor(card.CardID / 100);
                                    localIdToCount[localId] = (localIdToCount[localId] || 0) + 1;
                                }
                            }
                            else if (stack.CardID) {
                                if (stack.CardID % 100 !== 0) {
                                    throw new Error("Invalid card id ".concat(stack.CardID));
                                }
                                var localId = Math.floor(stack.CardID / 100);
                                localIdToCount[localId] = (localIdToCount[localId] || 0) + 1;
                            }
                            var localIdToId = {};
                            if (stack.CustomDeck) {
                                for (var localId in stack.CustomDeck) {
                                    if (stack.CustomDeck[localId]) {
                                        var parseResult = idRegex.exec(stack.CustomDeck[localId].FaceURL);
                                        var id = (parseResult && parseResult[1]) || '';
                                        if (!id) {
                                            throw new Error("Couldn't parse id from url ".concat(stack.CustomDeck[localId].FaceURL));
                                        }
                                        if (!idToLargeImageURI[id]) {
                                            // Ignore tokens and double faced cards.
                                            continue;
                                        }
                                        localIdToId[Number(localId)] = id;
                                    }
                                }
                            }
                            var boardToAddTo = mainboard.length === 0 ? mainboard : sideboard;
                            for (var localId in localIdToCount) {
                                if (!localIdToId[localId]) {
                                    // ID won't be present for tokens or double faced cards.
                                    continue;
                                }
                                var newCards = new Array(localIdToCount[localId]).fill(localIdToId[localId]);
                                boardToAddTo.splice.apply(boardToAddTo, __spreadArray([boardToAddTo.length, 0], newCards, false));
                            }
                        }
                        console.log(mainboard);
                        console.log(sideboard);
                        if (mainboard.length > 0) {
                            props.addDeck({
                                keycard: mainboard[0],
                                mainboard: mainboard,
                                sideboard: sideboard,
                                name: fileData.name || 'new deck',
                            });
                        }
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            });
        }, onDragOver: function (e) { return e.preventDefault(); }, onDragEnter: function () { return setShowingIndicator(true); }, onDragEnd: function () { return setShowingIndicator(false); }, onDragExit: function () { return setShowingIndicator(false); }, onDragLeave: function () { return setShowingIndicator(false); } }, !showingIndicator ? null :
        react_1.default.createElement("div", { style: {
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                backgroundColor: '#000000aa',
            } },
            react_1.default.createElement("div", { style: {
                    pointerEvents: 'none',
                    width: '1000px',
                    height: '300px',
                    position: 'absolute',
                    top: 'calc(50% - 150px)',
                    left: 'calc(50% - 500px)',
                    color: 'white',
                    backgroundColor: '#000000aa',
                    borderRadius: '18px',
                    fontSize: '64px',
                } },
                react_1.default.createElement("div", { style: { textAlign: 'center', marginTop: '64px' } }, "DROP .JSON FILES ANYWHERE"),
                react_1.default.createElement("div", { style: { textAlign: 'center' } }, "TO IMPORT EXISTING DECKS"))));
}
exports.default = DeckDropHandler;
//# sourceMappingURL=deck_drop_handler.js.map