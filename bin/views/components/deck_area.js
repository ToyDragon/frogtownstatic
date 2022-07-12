"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var tabletop_simulator_1 = __importDefault(require("../exporter/tabletop_simulator"));
var card_area_1 = __importDefault(require("./card_area"));
var display_dropdown_1 = __importStar(require("./display_dropdown"));
var grouper_dropdown_1 = __importDefault(require("./grouper_dropdown"));
function deckArea(props) {
    var _a = react_1.useState(display_dropdown_1.DisplayMode.Grid), displayMode = _a[0], setDisplayMode = _a[1];
    var _b = react_1.useState(null), grouper = _b[0], setGrouper = _b[1];
    var _c = react_1.useState(false), exportReady = _c[0], setExportReady = _c[1];
    var setImageMapLoaded = react_1.useState(false)[1];
    var tabletopSimManager = react_1.useRef(new tabletop_simulator_1.default(props.loader));
    react_1.useEffect(function () {
        props.loader.getMapData('IDToLargeImageURI').then(function () {
            setImageMapLoaded(true);
        });
        tabletopSimManager.current.ready.then(function () {
            setExportReady(true);
        });
    }, []);
    var keycardImageUrl = '';
    var idToLargeImageURI = props.loader.getMapDataSync('IDToLargeImageURI');
    if (idToLargeImageURI) {
        keycardImageUrl = "url(\"" + idToLargeImageURI[props.keycard] + "\")";
    }
    var downloadProps = {
        href: !exportReady ? '#' :
            'data:text/json,' +
                encodeURIComponent(tabletopSimManager.current.exportDeck(props.mainboardCards, props.sideboardCards, props.backUrl)),
        download: !exportReady ? '' : props.name + ".json",
    };
    return (react_1.default.createElement("div", { style: {
            position: 'relative',
            width: '100%',
            height: '100%',
            flexGrow: '0',
        } },
        react_1.default.createElement("div", { style: {
                position: 'absolute',
                top: '8px',
                left: '16px',
                width: '220px',
                height: '160px',
                backgroundPosition: '-24px -44px',
                backgroundSize: '269px 375px',
                backgroundImage: keycardImageUrl,
                borderRadius: '12px',
            } }),
        react_1.default.createElement("div", { style: {
                width: '100%',
                height: '176px',
                backgroundColor: '#303b4c',
            } }),
        react_1.default.createElement("div", { style: {
                position: 'absolute',
                fontSize: '44px',
                color: 'white',
                left: '267px',
                top: '92px',
            } },
            props.name,
            " (",
            props.mainboardCards.length + props.sideboardCards.length,
            " cards)"),
        react_1.default.createElement("div", { style: {
                overflowY: 'scroll',
                height: 'calc(100% - 176px)',
            } },
            react_1.default.createElement("div", { style: {
                    fontSize: '44px',
                    marginLeft: '25px',
                    marginBottom: '-16px',
                    visibility: props.mainboardCards.length === 0 ? 'hidden' : 'visible',
                } }, "Mainboard"),
            react_1.default.createElement(card_area_1.default, { imageLoadTracker: props.imageLoadTracker, cardIds: props.mainboardCards, displayMode: displayMode, loader: props.loader, urlLoader: props.urlLoader, grouper: grouper, actionHandlers: {
                    onAdd: function (cardId) {
                        props.addCard(cardId, false);
                    },
                    onRemove: function (cardId) {
                        props.removeCard(cardId, false);
                    },
                    onSideboard: function (cardId) {
                        props.moveCard(cardId, true);
                    },
                    onSimilar: props.onSimilar,
                    onStar: props.onStar,
                } }),
            react_1.default.createElement("div", { style: {
                    fontSize: '44px',
                    marginLeft: '25px',
                    marginBottom: '-16px',
                    visibility: props.sideboardCards.length === 0 ? 'hidden' : 'visible',
                } }, "Sideboard"),
            react_1.default.createElement(card_area_1.default, { imageLoadTracker: props.imageLoadTracker, cardIds: props.sideboardCards, displayMode: displayMode, loader: props.loader, urlLoader: props.urlLoader, grouper: grouper, actionHandlers: {
                    onAdd: function (cardId) {
                        props.addCard(cardId, true);
                    },
                    onRemove: function (cardId) {
                        props.removeCard(cardId, true);
                    },
                    onSideboard: function (cardId) {
                        props.moveCard(cardId, false);
                    },
                    onSimilar: function (cardId) {
                        console.log(props.onSimilar, cardId);
                        if (props.onSimilar) {
                            props.onSimilar(cardId);
                        }
                    },
                    onStar: props.onStar,
                } })),
        react_1.default.createElement("div", { style: {
                padding: '16px',
                paddingBottom: '0',
                paddingRight: '0',
                position: 'absolute',
                left: '245px',
                top: '32px',
            } },
            react_1.default.createElement(display_dropdown_1.default, { loader: props.loader, value: displayMode, setValue: setDisplayMode, allowedModes: [
                    display_dropdown_1.DisplayMode.Grid,
                    display_dropdown_1.DisplayMode.CompactGrid,
                    display_dropdown_1.DisplayMode.List,
                    display_dropdown_1.DisplayMode.Details,
                    display_dropdown_1.DisplayMode.Text,
                    display_dropdown_1.DisplayMode.TextIDs,
                ] }),
            react_1.default.createElement(grouper_dropdown_1.default, { loader: props.loader, value: grouper, setValue: setGrouper }),
            react_1.default.createElement("div", { className: "input-group", style: {
                    display: 'inline-block',
                    width: 'unset',
                    marginLeft: '5px',
                    marginBottom: '12px',
                } },
                react_1.default.createElement("button", { type: "button", className: "btn btn-primary dropdown-toggle", "data-bs-toggle": "dropdown", "aria-expanded": "false" }, "Actions"),
                react_1.default.createElement("ul", { className: "dropdown-menu" },
                    react_1.default.createElement("li", null,
                        react_1.default.createElement("a", { className: "dropdown-item", href: "#", onMouseUp: function () { return props.onEditName(); } }, "Edit Name")),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement("a", { className: "dropdown-item", href: "#", onMouseUp: function () { return props.onBulkImport(); } }, "Bulk Import")),
                    react_1.default.createElement("li", { style: {
                            backgroundColor: exportReady ? 'transparent' : 'lightgray',
                        } },
                        react_1.default.createElement("a", __assign({ className: "dropdown-item" }, downloadProps), "Export to Tabletop Simulator")),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement("a", { className: "dropdown-item", href: "#", onMouseUp: function () { return props.onSettings(); } }, "Settings")))))));
}
exports.default = deckArea;
//# sourceMappingURL=deck_area.js.map