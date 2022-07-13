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
var react_1 = __importStar(require("react"));
var react_2 = require("react");
var icon_check_1 = __importDefault(require("../bootstrap_icons/icon_check"));
function loadingWindow(props) {
    var _a = (0, react_2.useState)(true), isOpen = _a[0], setIsOpen = _a[1];
    var _b = (0, react_2.useState)(false), nameLoaded = _b[0], setNameLoaded = _b[1];
    var _c = (0, react_2.useState)(false), textLoaded = _c[0], setTextLoaded = _c[1];
    var _d = (0, react_2.useState)(false), imagesLoaded = _d[0], setImagesLoaded = _d[1];
    var _e = (0, react_2.useState)(false), cropsLoaded = _e[0], setCropsLoaded = _e[1];
    (0, react_1.useEffect)(function () {
        props.loader.getMapData('IDToName').then(function () { return setNameLoaded(true); });
        props.loader.getMapData('IDToText').then(function () { return setTextLoaded(true); });
        props.loader.getMapData('IDToLargeImageURI').then(function () { return setImagesLoaded(true); });
        props.loader.getMapData('IDToCropImageURI').then(function () { return setCropsLoaded(true); });
        Promise.all([
            props.loader.getMapData('IDToName'),
            props.loader.getMapData('IDToText'),
            props.loader.getMapData('IDToLargeImageURI'),
            props.loader.getMapData('IDToCropImageURI'),
        ]).then(function () {
            setIsOpen(false);
        });
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
            zIndex: '6',
        } },
        react_1.default.createElement("div", { style: {
                width: '550px',
                height: '170px',
                position: 'absolute',
                left: 'calc(50% - 275px)',
                top: 'calc(50% - 85px)',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '3px solid #cdd6e4',
                padding: '18px',
                fontSize: '18px',
            }, onMouseUp: function (e) { return e.stopPropagation(); } },
            react_1.default.createElement("div", { style: { fontWeight: 'bold' } }, "Loading data required for displaying your existing decks."),
            react_1.default.createElement("div", { style: { paddingLeft: '12px' } },
                "Loading name data... ",
                nameLoaded ? react_1.default.createElement(icon_check_1.default, null) : react_1.default.createElement(react_1.default.Fragment, null)),
            react_1.default.createElement("div", { style: { paddingLeft: '12px' } },
                "Loading text data... ",
                textLoaded ? react_1.default.createElement(icon_check_1.default, null) : react_1.default.createElement(react_1.default.Fragment, null)),
            react_1.default.createElement("div", { style: { paddingLeft: '12px' } },
                "Loading image data... ",
                imagesLoaded ? react_1.default.createElement(icon_check_1.default, null) : react_1.default.createElement(react_1.default.Fragment, null)),
            react_1.default.createElement("div", { style: { paddingLeft: '12px' } },
                "Loading crop data... ",
                cropsLoaded ? react_1.default.createElement(icon_check_1.default, null) : react_1.default.createElement(react_1.default.Fragment, null))));
}
exports.default = loadingWindow;
//# sourceMappingURL=loading_window.js.map