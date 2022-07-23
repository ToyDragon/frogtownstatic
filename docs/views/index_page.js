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
var header_bar_1 = __importDefault(require("./components/header_bar"));
var react_1 = __importStar(require("react"));
var deck_1 = require("../data/deck");
var search_area_1 = __importDefault(require("./components/search_area"));
var deck_area_1 = __importDefault(require("./components/deck_area"));
var hovercard_handler_1 = __importDefault(require("./components/hovercard_handler"));
var edit_name_window_1 = __importDefault(require("./components/edit_name_window"));
var bulk_import_window_1 = __importDefault(require("./components/bulk_import_window"));
var settings_window_1 = __importDefault(require("./components/settings_window"));
var secondary_load_window_1 = __importDefault(require("./components/secondary_load_window"));
var loading_window_1 = __importDefault(require("./components/loading_window"));
var confirm_delete_window_1 = __importDefault(require("./components/confirm_delete_window"));
var deck_drop_handler_1 = __importDefault(require("./components/deck_drop_handler"));
var info_window_1 = __importDefault(require("./components/info_window"));
var swap_printings_window_1 = __importDefault(require("./components/swap_printings_window"));
var legacy_deck_loader_1 = __importStar(require("./components/legacy_deck_loader"));
var choose_storage_window_1 = __importDefault(require("./components/choose_storage_window"));
var confirmation_window_1 = __importDefault(require("./components/confirmation_window"));
var storage_1 = require("../data/storage");
var frogtown_metadata_1 = require("../data/frogtown_metadata");
var backup_decks_1 = __importDefault(require("../data/backup_decks"));
var bug71722MainboardSideboard_1 = require("../data/bugs/bug71722MainboardSideboard");
var notification_window_1 = __importDefault(require("./components/notification_window"));
function uniques(vals) {
    var obj = {};
    for (var _i = 0, vals_1 = vals; _i < vals_1.length; _i++) {
        var val = vals_1[_i];
        obj[val] = true;
    }
    return Object.keys(obj);
}
function indexPage(props) {
    var _this = this;
    // Call getMapData with the maps required to display the page, to ensure they always start loading first.
    var priorityMaps = [
        props.loader.getMapData('IDToName'),
        props.loader.getMapData('IDToText'),
        props.loader.getMapData('IDToNormalImageURI'),
        props.loader.getMapData('IDToCropImageURI'),
    ];
    props.loader.holdUntil(Promise.all(priorityMaps));
    var _a = (0, react_1.useState)(0), deckIndex = _a[0], setDeckIndex = _a[1];
    var _b = (0, react_1.useState)([]), decks = _b[0], setDecks = _b[1];
    var _c = (0, react_1.useState)(550), searchWidth = _c[0], setSearchWidth = _c[1];
    var editNameWindowRef = (0, react_1.useRef)(null);
    var searchAreaRef = (0, react_1.useRef)(null);
    var bulkImportWindowRef = (0, react_1.useRef)(null);
    var notificationWindowRef = (0, react_1.useRef)(null);
    var confirmationWindowRef = (0, react_1.useRef)(null);
    var settingsWindowRef = (0, react_1.useRef)(null);
    var confirmDeleteWindowRef = (0, react_1.useRef)(null);
    var infoWindowRef = (0, react_1.useRef)(null);
    var swapPrintingsWindowRef = (0, react_1.useRef)(null);
    var storageRef = (0, react_1.useRef)(null);
    var _d = (0, react_1.useState)(''), legacyPublicId = _d[0], setLegacyPublicId = _d[1];
    var _e = (0, react_1.useState)(''), legacyBetaPublicId = _e[0], setLegacyBetaPublicId = _e[1];
    function tryMoveCacheIntoFolder(decks) {
        return __awaiter(this, void 0, void 0, function () {
            var localStorage, dirDecks, cacheDecks, performTransfer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localStorage = (0, storage_1.createLocalStorage)();
                        return [4 /*yield*/, (0, deck_1.loadDecksFromStorage)(storageRef.current)];
                    case 1:
                        dirDecks = _a.sent();
                        return [4 /*yield*/, (0, deck_1.loadDecksFromStorage)(localStorage)];
                    case 2:
                        cacheDecks = _a.sent();
                        if (!cacheDecks.filter(function (d) { return d.mainboard.length || d.sideboard.length; }).length) return [3 /*break*/, 4];
                        return [4 /*yield*/, confirmationWindowRef.current.open("Would you like to transfer the ".concat(cacheDecks.length, " decks in your local cache to this folder?"), 'The decks will no longer be available when choosing "Local Cache".', 'Transfer Decks')];
                    case 3:
                        performTransfer = _a.sent();
                        if (performTransfer) {
                            decks.splice.apply(decks, __spreadArray([decks.length, 0], dirDecks, false));
                            decks.splice.apply(decks, __spreadArray([decks.length, 0], cacheDecks, false));
                            localStorage.set('deck_count', '0');
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    (0, react_1.useEffect)(function () {
        (0, deck_1.saveDecksToStorage)(storageRef.current, decks);
    }, [decks]);
    (0, react_1.useEffect)(function () {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!storageRef.current) {
                            if (decks === null || decks === void 0 ? void 0 : decks.length) {
                                console.error('Decks changed before storage ready: ', decks);
                            }
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, storageRef.current.set("deck_index", deckIndex.toString())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [deckIndex]);
    (0, react_1.useEffect)(function () {
        var body = document.getElementsByTagName('body')[0];
        var dragging = false;
        var dragStartX = -1;
        var lastSearchWidth = searchWidth;
        body.addEventListener('mousedown', function (e) {
            for (var _i = 0, _a = document.elementsFromPoint(e.pageX, e.pageY); _i < _a.length; _i++) {
                var ele = _a[_i];
                if (ele.id === 'searchDragBar') {
                    dragging = true;
                    dragStartX = e.pageX;
                    e.preventDefault();
                    return true;
                }
            }
            return false;
        });
        body.addEventListener('mouseup', function () {
            dragging = false;
        });
        body.addEventListener('mousemove', function (e) {
            if (dragging) {
                var xDiff = e.pageX - dragStartX;
                if (lastSearchWidth + xDiff >= 550 && lastSearchWidth + xDiff <= 1055) {
                    dragStartX = e.pageX;
                    lastSearchWidth += xDiff;
                    setSearchWidth(lastSearchWidth);
                }
            }
        });
    }, []);
    var addCard = function (cardId, toSideboard) {
        var newDecks = (0, deck_1.copyDecks)(decks);
        if (toSideboard) {
            newDecks[deckIndex].sideboard.push(cardId);
        }
        else {
            newDecks[deckIndex].mainboard.push(cardId);
        }
        setDecks(newDecks);
    };
    var addCards = function (toMainboard, toSideboard) {
        var newDecks = (0, deck_1.copyDecks)(decks);
        if (toMainboard) {
            for (var _i = 0, toMainboard_1 = toMainboard; _i < toMainboard_1.length; _i++) {
                var cardId = toMainboard_1[_i];
                newDecks[deckIndex].mainboard.push(cardId);
            }
        }
        if (toSideboard) {
            for (var _a = 0, toSideboard_1 = toSideboard; _a < toSideboard_1.length; _a++) {
                var cardId = toSideboard_1[_a];
                newDecks[deckIndex].sideboard.push(cardId);
            }
        }
        setDecks(newDecks);
    };
    var removeCard = function (cardId, toSideboard) {
        var newDecks = (0, deck_1.copyDecks)(decks);
        if (toSideboard) {
            for (var i = 0; i < newDecks[deckIndex].sideboard.length; i++) {
                if (newDecks[deckIndex].sideboard[i] === cardId) {
                    newDecks[deckIndex].sideboard.splice(i, 1);
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < newDecks[deckIndex].mainboard.length; i++) {
                if (newDecks[deckIndex].mainboard[i] === cardId) {
                    newDecks[deckIndex].mainboard.splice(i, 1);
                    break;
                }
            }
        }
        setDecks(newDecks);
    };
    var moveCard = function (cardId, toSideboard) {
        var newDecks = (0, deck_1.copyDecks)(decks);
        if (toSideboard) {
            for (var i = 0; i < newDecks[deckIndex].mainboard.length; i++) {
                if (newDecks[deckIndex].mainboard[i] === cardId) {
                    newDecks[deckIndex].mainboard.splice(i, 1);
                    break;
                }
            }
            newDecks[deckIndex].sideboard.push(cardId);
        }
        else {
            for (var i = 0; i < newDecks[deckIndex].sideboard.length; i++) {
                if (newDecks[deckIndex].sideboard[i] === cardId) {
                    newDecks[deckIndex].sideboard.splice(i, 1);
                    break;
                }
            }
            newDecks[deckIndex].mainboard.push(cardId);
        }
        setDecks(newDecks);
    };
    var setBackgroundUrl = function (newUrl) {
        var newDecks = (0, deck_1.copyDecks)(decks);
        newDecks[deckIndex].backgroundUrl = newUrl;
        setDecks(newDecks);
    };
    var onStar = function (cardId) {
        var newDecks = (0, deck_1.copyDecks)(decks);
        newDecks[deckIndex].keycard = cardId;
        setDecks(newDecks);
    };
    var addDeck = function () {
        var newDecks = (0, deck_1.copyDecks)(decks);
        newDecks.push((0, deck_1.createNewDeck)(newDecks.length + 1));
        setDecks(newDecks);
        setDeckIndex(newDecks.length - 1);
    };
    var swapCard = function (fromId, toId) {
        var newDecks = (0, deck_1.copyDecks)(decks);
        console.log('Swap from ', fromId, toId);
        newDecks[deckIndex].mainboard = newDecks[deckIndex].mainboard.map(function (id) { return (id === fromId ? toId : id); });
        newDecks[deckIndex].sideboard = newDecks[deckIndex].sideboard.map(function (id) { return (id === fromId ? toId : id); });
        setDecks(newDecks);
    };
    var deleteConfirmed = function () {
        var newDecks = (0, deck_1.copyDecks)(decks);
        newDecks.splice(deckIndex, 1);
        if (newDecks.length === 0) {
            newDecks.push((0, deck_1.createNewDeck)(1));
            setDeckIndex(0);
        }
        else if (deckIndex >= newDecks.length) {
            setDeckIndex(newDecks.length - 1);
        }
        setDecks(newDecks);
    };
    var deck = deckIndex >= decks.length ? null : decks[deckIndex];
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(header_bar_1.default, { loader: props.loader, decks: decks, changeDeck: function (i) {
                setDeckIndex(i);
            }, newDeck: addDeck, onInfo: function () { return infoWindowRef.current.open(legacyPublicId, legacyBetaPublicId); } }),
        react_1.default.createElement(search_area_1.default, { ref: searchAreaRef, loader: props.loader, urlLoader: props.urlLoader, addCard: function (cardId) {
                addCard(cardId, false);
            }, onSwap: function (id) {
                if (swapPrintingsWindowRef.current) {
                    swapPrintingsWindowRef.current.open(id);
                }
            }, imageLoadTracker: props.imageLoadTracker, width: searchWidth }),
        react_1.default.createElement("div", { id: 'searchDragBar', style: {
                position: 'fixed',
                left: "".concat(searchWidth, "px"),
                top: 'calc(50% - 32px)',
                width: '16px',
                height: '64px',
                backgroundColor: '#303b4c',
                borderTopRightRadius: '5px',
                borderBottomRightRadius: '5px',
                cursor: 'col-resize',
            } },
            react_1.default.createElement("div", { style: {
                    display: 'block',
                    width: '2px',
                    height: '54px',
                    backgroundColor: 'lightgray',
                    position: 'absolute',
                    left: '6px',
                    top: '5px',
                } })),
        react_1.default.createElement("div", { style: {
                display: 'inline-block',
                width: "calc(100% - ".concat(searchWidth, "px)"),
                height: '100%',
            } },
            react_1.default.createElement(deck_area_1.default, { imageLoadTracker: props.imageLoadTracker, deck: deck, loader: props.loader, addCard: addCard, onStar: onStar, onEditName: function () { var _a; return deck && ((_a = editNameWindowRef.current) === null || _a === void 0 ? void 0 : _a.open(deck.name)); }, onBulkImport: function () { var _a; return (_a = bulkImportWindowRef.current) === null || _a === void 0 ? void 0 : _a.open(); }, onClone: function () {
                    var newDecks = (0, deck_1.copyDecks)(decks);
                    var copy = (0, deck_1.copyDeck)(newDecks[deckIndex]);
                    copy.name += ' (Copy)';
                    newDecks.splice(deckIndex, 0, copy);
                    setDecks(newDecks);
                }, onSettings: function () {
                    var _a;
                    if (!deck) {
                        return;
                    }
                    var existingUrls = decks.map(function (d) { return d.backgroundUrl; }).filter(function (url) { return !!url; });
                    existingUrls.splice(0, 0, 'https://i.imgur.com/Hg8CwwU.jpeg');
                    return (_a = settingsWindowRef.current) === null || _a === void 0 ? void 0 : _a.open(uniques(existingUrls), deck.backgroundUrl);
                }, onDelete: function () { var _a; return deck && ((_a = confirmDeleteWindowRef.current) === null || _a === void 0 ? void 0 : _a.open(deck.name)); }, urlLoader: props.urlLoader, removeCard: removeCard, moveCard: moveCard, onSimilar: function (id) {
                    if (searchAreaRef.current) {
                        searchAreaRef.current.onSimilar(id);
                    }
                }, onSwap: function (id) {
                    if (swapPrintingsWindowRef.current) {
                        swapPrintingsWindowRef.current.open(id);
                    }
                } })),
        react_1.default.createElement(edit_name_window_1.default, { ref: editNameWindowRef, nameChanged: function (newName) {
                var newDecks = (0, deck_1.copyDecks)(decks);
                newDecks[deckIndex].name = newName;
                setDecks(newDecks);
            } }),
        react_1.default.createElement(bulk_import_window_1.default, { ref: bulkImportWindowRef, loader: props.loader, addCards: addCards }),
        react_1.default.createElement(settings_window_1.default, { ref: settingsWindowRef, loader: props.loader, setBackgroundUrl: setBackgroundUrl }),
        react_1.default.createElement(hovercard_handler_1.default, { loader: props.loader }),
        react_1.default.createElement(loading_window_1.default, { loader: props.loader }),
        react_1.default.createElement(confirm_delete_window_1.default, { deleteConfirmed: deleteConfirmed, ref: confirmDeleteWindowRef }),
        react_1.default.createElement(info_window_1.default, { ref: infoWindowRef, onReexport: function (publicId) { return __awaiter(_this, void 0, void 0, function () {
                var newDecks;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, legacy_deck_loader_1.loadLegacyDecksForPublicId)(publicId, (0, deck_1.copyDecks)(decks), props.urlLoader)];
                        case 1:
                            newDecks = _a.sent();
                            if (newDecks && JSON.stringify(newDecks) !== JSON.stringify(decks)) {
                                setDecks(newDecks);
                            }
                            return [2 /*return*/];
                    }
                });
            }); } }),
        react_1.default.createElement(secondary_load_window_1.default, { loader: props.loader }),
        react_1.default.createElement(swap_printings_window_1.default, { ref: swapPrintingsWindowRef, addCard: function (id) { return addCard(id, false); }, loader: props.loader, imageLoadTracker: props.imageLoadTracker, urlLoader: props.urlLoader, swapCard: swapCard }),
        react_1.default.createElement(deck_drop_handler_1.default, { loader: props.loader, addDeck: function (deck) {
                for (var i = 0; i < decks.length; i++) {
                    var existingDeck = decks[i];
                    if (deck.mainboard.sort().join(',') === existingDeck.mainboard.sort().join(',') &&
                        deck.sideboard.sort().join(',') === existingDeck.sideboard.sort().join(',')) {
                        setDeckIndex(i);
                        console.log('Selected existing ' + i);
                        return;
                    }
                }
                var newDecks = (0, deck_1.copyDecks)(decks);
                newDecks.push(deck);
                setDecks(newDecks);
                setDeckIndex(newDecks.length - 1);
            } }),
        react_1.default.createElement(choose_storage_window_1.default, { confirmationWindow: confirmationWindowRef, storageChosen: function (useCache, folder) { return __awaiter(_this, void 0, void 0, function () {
                var loadedDecks, existingMetadata, _a, _b, _c, currentMetadata, storageDecks, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            loadedDecks = (0, deck_1.copyDecks)(decks);
                            if (!useCache) return [3 /*break*/, 1];
                            storageRef.current = (0, storage_1.createLocalStorage)();
                            return [3 /*break*/, 13];
                        case 1:
                            if (!folder) return [3 /*break*/, 13];
                            notificationWindowRef.current.open('Attaching to folder...', 'Waiting for permission to read from and write to the specified folder...');
                            storageRef.current = (0, storage_1.createDirectoryStorage)(folder, document);
                            existingMetadata = null;
                            _f.label = 2;
                        case 2:
                            _f.trys.push([2, 4, , 5]);
                            _b = (_a = JSON).parse;
                            return [4 /*yield*/, storageRef.current.get('frogtown_metadata.json')];
                        case 3:
                            existingMetadata = _b.apply(_a, [(_f.sent()) || '']);
                            return [3 /*break*/, 5];
                        case 4:
                            _c = _f.sent();
                            return [3 /*break*/, 5];
                        case 5:
                            currentMetadata = (0, frogtown_metadata_1.getCurrentMetadata)();
                            console.log({ existingMetadata: existingMetadata, currentMetadata: currentMetadata });
                            return [4 /*yield*/, storageRef.current.set('frogtown_metadata.json', JSON.stringify(existingMetadata), true)];
                        case 6:
                            if (!!(_f.sent())) return [3 /*break*/, 8];
                            notificationWindowRef.current.close();
                            return [4 /*yield*/, confirmationWindowRef.current.open('Failed To Write To Storage', 'Frogtown was unable to write your decks to the selected folder, and will now refresh.', 'OK')];
                        case 7:
                            _f.sent();
                            window.location.reload();
                            return [2 /*return*/];
                        case 8:
                            notificationWindowRef.current.close();
                            if (!(currentMetadata.majorVersion !== (existingMetadata === null || existingMetadata === void 0 ? void 0 : existingMetadata.majorVersion))) return [3 /*break*/, 10];
                            return [4 /*yield*/, (0, backup_decks_1.default)(storageRef.current, notificationWindowRef.current, existingMetadata || { majorVersion: 0, minorVersion: 0 })];
                        case 9:
                            _f.sent();
                            _f.label = 10;
                        case 10: return [4 /*yield*/, storageRef.current.set('frogtown_metadata.json', JSON.stringify(currentMetadata))];
                        case 11:
                            _f.sent();
                            return [4 /*yield*/, tryMoveCacheIntoFolder(loadedDecks)];
                        case 12:
                            _f.sent();
                            _f.label = 13;
                        case 13:
                            if (!!storageRef.current) return [3 /*break*/, 14];
                            console.error('Failed to initialize storage!');
                            return [3 /*break*/, 19];
                        case 14: return [4 /*yield*/, (0, deck_1.loadDecksFromStorage)(storageRef.current)];
                        case 15:
                            storageDecks = _f.sent();
                            loadedDecks.splice.apply(loadedDecks, __spreadArray([loadedDecks.length, 0], storageDecks, false));
                            _d = setDeckIndex;
                            _e = Number;
                            return [4 /*yield*/, storageRef.current.get('deck_index')];
                        case 16:
                            _d.apply(void 0, [_e.apply(void 0, [(_f.sent()) || '0'])]);
                            // Data transforms to address/mitigate bugs in previous versions.
                            return [4 /*yield*/, (0, bug71722MainboardSideboard_1.transformBug71722MainboardSideboard)(storageRef.current, loadedDecks)];
                        case 17:
                            // Data transforms to address/mitigate bugs in previous versions.
                            _f.sent();
                            // Always pass local storage to the legacy deck loader, it is only used to track if decks have already been
                            // imported or not. The old IDs are stored in cookies, and the decks should only be imported once, makes sense
                            // to keep it in all in the browser.
                            return [4 /*yield*/, (0, legacy_deck_loader_1.default)(loadedDecks, setLegacyPublicId, setLegacyBetaPublicId, window.location.search, document.cookie, props.urlLoader, (0, storage_1.createLocalStorage)())];
                        case 18:
                            // Always pass local storage to the legacy deck loader, it is only used to track if decks have already been
                            // imported or not. The old IDs are stored in cookies, and the decks should only be imported once, makes sense
                            // to keep it in all in the browser.
                            _f.sent();
                            setDecks(loadedDecks);
                            _f.label = 19;
                        case 19: return [2 /*return*/];
                    }
                });
            }); } }),
        react_1.default.createElement(confirmation_window_1.default, { ref: confirmationWindowRef }),
        react_1.default.createElement(notification_window_1.default, { ref: notificationWindowRef }));
}
exports.default = indexPage;
//# sourceMappingURL=index_page.js.map