"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var header_deck_preview_1 = __importDefault(require("./header_deck_preview"));
function HeaderBar(props) {
    return (react_1.default.createElement("div", { className: "header", style: {
            position: 'absolute',
            width: '100%',
        } },
        react_1.default.createElement("a", { href: "#", className: "active header-item", onMouseUp: function (e) {
                if (e.button === 0) {
                    props.onInfo();
                }
            } }, "About Frogtown"),
        react_1.default.createElement("div", { className: "dropdown", style: { display: 'inline-block' } },
            react_1.default.createElement("div", { className: "btn dropdown-toggle header-item", "data-bs-toggle": "dropdown", "aria-expanded": "false", style: {
                    'marginTop': '-12px',
                    'marginBottom': '0',
                } },
                "My Decks ",
                react_1.default.createElement("span", { className: "caret", style: { marginLeft: '5px' } })),
            react_1.default.createElement("div", { className: "dropdown-menu" },
                react_1.default.createElement("div", { style: {
                        width: '700px',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        maxHeight: '800px',
                        padding: '0 5px',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                    } },
                    react_1.default.createElement("div", null,
                        props.decks.map(function (deck, i) {
                            return react_1.default.createElement(header_deck_preview_1.default, { key: i, deck: deck, loader: props.loader, changeToDeck: function () {
                                    props.changeDeck(i);
                                } });
                        }),
                        react_1.default.createElement(header_deck_preview_1.default, { key: 'newdeck', deck: {
                                keycard: '75b56b18-47a3-470b-911c-57da82c5ac03',
                                name: 'New Deck',
                                mainboard: [],
                                sideboard: [],
                                backgroundUrl: '',
                            }, loader: props.loader, changeToDeck: function () {
                                props.newDeck();
                            } })))))));
}
exports.default = HeaderBar;
//# sourceMappingURL=header_bar.js.map