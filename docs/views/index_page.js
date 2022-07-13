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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var header_bar_1 = __importDefault(require("./components/header_bar"));
var react_1 = __importStar(require("react"));
var search_area_1 = __importDefault(require("./components/search_area"));
var deck_area_1 = __importDefault(require("./components/deck_area"));
var hovercard_handler_1 = __importDefault(require("./components/hovercard_handler"));
var edit_name_window_1 = __importDefault(require("./components/edit_name_window"));
var bulk_import_window_1 = __importDefault(require("./components/bulk_import_window"));
var settings_window_1 = __importDefault(require("./components/settings_window"));
var loading_window_1 = __importDefault(require("./components/loading_window"));
var confirm_delete_window_1 = __importDefault(require("./components/confirm_delete_window"));
var deck_drop_handler_1 = __importDefault(require("./components/deck_drop_handler"));
var info_window_1 = __importDefault(require("./components/info_window"));
function createNewDeck(num) {
    return {
        keycard: '75b56b18-47a3-470b-911c-57da82c5ac03',
        name: "Deck #".concat(num),
        mainboard: [],
        sideboard: [],
    };
}
function copyDecks(decks) {
    var newDecks = [];
    for (var _i = 0, decks_1 = decks; _i < decks_1.length; _i++) {
        var deck = decks_1[_i];
        newDecks.push({
            name: deck.name,
            keycard: deck.keycard,
            mainboard: deck.mainboard.slice(),
            sideboard: deck.sideboard.slice(),
        });
    }
    return newDecks;
}
function indexPage(props) {
    // Call getMapData with the maps required to display the page, to ensure they always start loading first.
    var priorityMaps = [
        props.loader.getMapData('IDToName'),
        props.loader.getMapData('IDToText'),
        props.loader.getMapData('IDToLargeImageURI'),
        props.loader.getMapData('IDToCropImageURI'),
    ];
    props.loader.holdUntil(Promise.all(priorityMaps));
    var searchRef = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(localStorage.getItem('background_url') || 'https://i.imgur.com/Hg8CwwU.jpeg'), backgroundUrl = _a[0], setBackgroundUrl = _a[1];
    var _b = (0, react_1.useState)(Number(localStorage.getItem('deck_index') || '0')), deckIndex = _b[0], setDeckIndex = _b[1];
    var _c = (0, react_1.useState)(new Array(Number(localStorage.getItem('deck_count') || '1'))
        .fill(null).map(function (_, i) {
        var deck = null;
        try {
            deck = JSON.parse(localStorage.getItem("deck_".concat(i)) || 'null');
        }
        catch (_a) { }
        if (!deck) {
            deck = createNewDeck(i + 1);
        }
        return deck;
    })), decks = _c[0], setDecks = _c[1];
    var _d = (0, react_1.useState)(550), searchWidth = _d[0], setSearchWidth = _d[1];
    var editNameWindowRef = (0, react_1.useRef)(null);
    var bulkImportWindowRef = (0, react_1.useRef)(null);
    var settingsWindowRef = (0, react_1.useRef)(null);
    var confirmDeleteWindowRef = (0, react_1.useRef)(null);
    var infoWindowRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        for (var i = 0; i < decks.length; i++) {
            localStorage.setItem("deck_".concat(i), JSON.stringify(decks[i]));
        }
        localStorage.setItem("deck_count", decks.length.toString());
    }, [decks]);
    (0, react_1.useEffect)(function () {
        localStorage.setItem("deck_index", deckIndex.toString());
    }, [deckIndex]);
    (0, react_1.useEffect)(function () {
        localStorage.setItem("background_url", backgroundUrl);
    }, [backgroundUrl]);
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
                if (lastSearchWidth + xDiff >= 550 && lastSearchWidth + xDiff <= 1000) {
                    dragStartX = e.pageX;
                    lastSearchWidth += xDiff;
                    setSearchWidth(lastSearchWidth);
                }
            }
        });
    }, []);
    var addCard = function (cardId, toSideboard) {
        var newDecks = copyDecks(decks);
        if (toSideboard) {
            newDecks[deckIndex].sideboard.push(cardId);
        }
        else {
            newDecks[deckIndex].mainboard.push(cardId);
        }
        setDecks(newDecks);
    };
    var addCards = function (ids) {
        var newDecks = copyDecks(decks);
        for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
            var cardId = ids_1[_i];
            newDecks[deckIndex].mainboard.push(cardId);
        }
        setDecks(newDecks);
    };
    var removeCard = function (cardId, toSideboard) {
        var newDecks = copyDecks(decks);
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
        var newDecks = copyDecks(decks);
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
    var onStar = function (cardId) {
        var newDecks = copyDecks(decks);
        newDecks[deckIndex].keycard = cardId;
        setDecks(newDecks);
    };
    var addDeck = function () {
        var newDecks = copyDecks(decks);
        newDecks.push(createNewDeck(newDecks.length + 1));
        setDecks(newDecks);
        setDeckIndex(newDecks.length - 1);
    };
    var deleteConfirmed = function () {
        var newDecks = copyDecks(decks);
        newDecks.splice(deckIndex, 1);
        if (newDecks.length === 0) {
            newDecks.push(createNewDeck(1));
            setDeckIndex(0);
        }
        else if (deckIndex >= newDecks.length) {
            setDeckIndex(newDecks.length - 1);
        }
        setDecks(newDecks);
    };
    var deck = decks[deckIndex];
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(header_bar_1.default, { loader: props.loader, decks: decks, changeDeck: function (i) {
                setDeckIndex(i);
            }, newDeck: addDeck, onInfo: function () { return infoWindowRef.current.open(); } }),
        react_1.default.createElement(search_area_1.default, { ref: searchRef, loader: props.loader, urlLoader: props.urlLoader, addCard: function (cardId) {
                addCard(cardId, false);
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
            react_1.default.createElement(deck_area_1.default, { imageLoadTracker: props.imageLoadTracker, mainboardCards: deck.mainboard, keycard: deck.keycard, name: deck.name, sideboardCards: deck.sideboard, loader: props.loader, addCard: addCard, onStar: onStar, backUrl: backgroundUrl, onEditName: function () { var _a; return (_a = editNameWindowRef.current) === null || _a === void 0 ? void 0 : _a.open(deck.name); }, onBulkImport: function () { var _a; return (_a = bulkImportWindowRef.current) === null || _a === void 0 ? void 0 : _a.open(); }, onSettings: function () { var _a; return (_a = settingsWindowRef.current) === null || _a === void 0 ? void 0 : _a.open(backgroundUrl); }, onDelete: function () { var _a; return (_a = confirmDeleteWindowRef.current) === null || _a === void 0 ? void 0 : _a.open(deck.name); }, urlLoader: props.urlLoader, removeCard: removeCard, moveCard: moveCard, onSimilar: function (cardId) {
                    if (searchRef.current) {
                        searchRef.current.onSimilar(cardId);
                    }
                } })),
        react_1.default.createElement(edit_name_window_1.default, { ref: editNameWindowRef, nameChanged: function (newName) {
                var newDecks = copyDecks(decks);
                newDecks[deckIndex].name = newName;
                setDecks(newDecks);
            } }),
        react_1.default.createElement(bulk_import_window_1.default, { ref: bulkImportWindowRef, loader: props.loader, addCards: addCards }),
        react_1.default.createElement(settings_window_1.default, { ref: settingsWindowRef, loader: props.loader, setBackgroundUrl: setBackgroundUrl }),
        react_1.default.createElement(hovercard_handler_1.default, { loader: props.loader }),
        react_1.default.createElement(loading_window_1.default, { loader: props.loader }),
        react_1.default.createElement(confirm_delete_window_1.default, { deleteConfirmed: deleteConfirmed, ref: confirmDeleteWindowRef }),
        react_1.default.createElement(info_window_1.default, { ref: infoWindowRef }),
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
                var newDecks = copyDecks(decks);
                newDecks.push(deck);
                setDecks(newDecks);
                setDeckIndex(newDecks.length - 1);
            } }));
}
exports.default = indexPage;
//# sourceMappingURL=index_page.js.map