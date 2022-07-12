"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
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
function createNewDeck(num) {
    return {
        keycard: '75b56b18-47a3-470b-911c-57da82c5ac03',
        name: "Deck #" + num,
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
    var searchRef = react_1.useRef(null);
    var _a = react_1.useState(localStorage.getItem('background_url') || 'https://i.imgur.com/Hg8CwwU.jpeg'), backgroundUrl = _a[0], setBackgroundUrl = _a[1];
    var _b = react_1.useState(Number(localStorage.getItem('deck_index') || '0')), deckIndex = _b[0], setDeckIndex = _b[1];
    var _c = react_1.useState(new Array(Number(localStorage.getItem('deck_count') || '1'))
        .fill(null).map(function (_, i) {
        var deck = null;
        try {
            deck = JSON.parse(localStorage.getItem("deck_" + i) || 'null');
        }
        catch (_a) { }
        if (!deck) {
            deck = createNewDeck(i);
        }
        return deck;
    })), decks = _c[0], setDecks = _c[1];
    var _d = react_1.useState(550), searchWidth = _d[0], setSearchWidth = _d[1];
    var editNameWindowRef = react_1.useRef(null);
    var bulkImportWindowRef = react_1.useRef(null);
    var settingsWindowRef = react_1.useRef(null);
    react_1.useEffect(function () {
        for (var i = 0; i < decks.length; i++) {
            localStorage.setItem("deck_" + i, JSON.stringify(decks[i]));
        }
        localStorage.setItem("deck_count", decks.length.toString());
    }, [decks]);
    react_1.useEffect(function () {
        localStorage.setItem("deck_index", deckIndex.toString());
    }, [deckIndex]);
    react_1.useEffect(function () {
        localStorage.setItem("background_url", backgroundUrl);
    }, [backgroundUrl]);
    react_1.useEffect(function () {
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
    var deck = decks[deckIndex];
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(header_bar_1.default, { loader: props.loader, decks: decks, changeDeck: function (i) {
                setDeckIndex(i);
            }, newDeck: addDeck }),
        react_1.default.createElement(search_area_1.default, { ref: searchRef, loader: props.loader, urlLoader: props.urlLoader, addCard: function (cardId) {
                addCard(cardId, false);
            }, imageLoadTracker: props.imageLoadTracker, width: searchWidth }),
        react_1.default.createElement("div", { id: 'searchDragBar', style: {
                position: 'fixed',
                left: searchWidth + "px",
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
                width: "calc(100% - " + searchWidth + "px)",
                height: '100%',
            } },
            react_1.default.createElement(deck_area_1.default, { imageLoadTracker: props.imageLoadTracker, mainboardCards: deck.mainboard, keycard: deck.keycard, name: deck.name, sideboardCards: deck.sideboard, loader: props.loader, addCard: addCard, onStar: onStar, backUrl: backgroundUrl, onEditName: function () { var _a; return (_a = editNameWindowRef.current) === null || _a === void 0 ? void 0 : _a.open(deck.name); }, onBulkImport: function () { var _a; return (_a = bulkImportWindowRef.current) === null || _a === void 0 ? void 0 : _a.open(); }, onSettings: function () { var _a; return (_a = settingsWindowRef.current) === null || _a === void 0 ? void 0 : _a.open(backgroundUrl); }, urlLoader: props.urlLoader, removeCard: removeCard, moveCard: moveCard, onSimilar: function (cardId) {
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
        react_1.default.createElement(hovercard_handler_1.default, { loader: props.loader }));
}
exports.default = indexPage;
//# sourceMappingURL=index_page.js.map