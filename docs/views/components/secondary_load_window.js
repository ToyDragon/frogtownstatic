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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_2 = require("react");
function loadingWindow(props) {
    var _a = (0, react_2.useState)(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = (0, react_2.useState)(false), isIDToRarityLoaded = _b[0], setIDToRarityLoaded = _b[1];
    var _c = (0, react_2.useState)(false), isIDToColorLoaded = _c[0], setIDToColorLoaded = _c[1];
    var _d = (0, react_2.useState)(false), isIDToColorIdentityLoaded = _d[0], setIDToColorIdentityLoaded = _d[1];
    var _e = (0, react_2.useState)(false), isIDToSupertypeLoaded = _e[0], setIDToSupertypeLoaded = _e[1];
    var _f = (0, react_2.useState)(false), isIDToTypeLoaded = _f[0], setIDToTypeLoaded = _f[1];
    var _g = (0, react_2.useState)(false), isIDToSubtypeLoaded = _g[0], setIDToSubtypeLoaded = _g[1];
    var _h = (0, react_2.useState)(false), isIDToPowerLoaded = _h[0], setIDToPowerLoaded = _h[1];
    var _j = (0, react_2.useState)(false), isIDToToughnessLoaded = _j[0], setIDToToughnessLoaded = _j[1];
    var _k = (0, react_2.useState)(false), isIDToCMCLoaded = _k[0], setIDToCMCLoaded = _k[1];
    var _l = (0, react_2.useState)(false), isIDToLegalFormatLoaded = _l[0], setIDToLegalFormatLoaded = _l[1];
    var _m = (0, react_2.useState)(false), isIDToSetCodeLoaded = _m[0], setIDToSetCodeLoaded = _m[1];
    var _o = (0, react_2.useState)(false), isSetCodeToReleaseLoaded = _o[0], setSetCodeToReleaseLoaded = _o[1];
    var _p = (0, react_2.useState)(false), isIDToTokenStringsLoaded = _p[0], setIDToTokenStringsLoaded = _p[1];
    var _q = (0, react_2.useState)(false), isTokenIDToTokenStringLoaded = _q[0], setTokenIDToTokenStringLoaded = _q[1];
    var _r = (0, react_2.useState)(false), isTokenIDToNameLoaded = _r[0], setTokenIDToNameLoaded = _r[1];
    var _s = (0, react_2.useState)(false), isTokenIDToLargeImageURILoaded = _s[0], setTokenIDToLargeImageURILoaded = _s[1];
    var _t = (0, react_2.useState)(false), isFrontIDToBackIDLoaded = _t[0], setFrontIDToBackIDLoaded = _t[1];
    var _u = (0, react_2.useState)(false), isBackIDToLargeImageURILoaded = _u[0], setBackIDToLargeImageURILoaded = _u[1];
    var _v = (0, react_2.useState)(false), isSetCodeToSetNameLoaded = _v[0], setSetCodeToSetNameLoaded = _v[1];
    var _w = (0, react_2.useState)(false), isIDToCostLoaded = _w[0], setIDToCostLoaded = _w[1];
    (0, react_1.useEffect)(function () {
        Promise.all([
            props.loader.getMapData('IDToName'),
            props.loader.getMapData('IDToText'),
            props.loader.getMapData('IDToLargeImageURI'),
            props.loader.getMapData('IDToCropImageURI'),
        ]).then(function () {
            setIsOpen(true);
            var remainingPromises = [];
            /* eslint-disable max-len */
            remainingPromises.push(props.loader.getMapData('IDToRarity').then(function () { return setIDToRarityLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('IDToColor').then(function () { return setIDToColorLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('IDToColorIdentity').then(function () { return setIDToColorIdentityLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('IDToSupertype').then(function () { return setIDToSupertypeLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('IDToType').then(function () { return setIDToTypeLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('IDToSubtype').then(function () { return setIDToSubtypeLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('IDToPower').then(function () { return setIDToPowerLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('IDToToughness').then(function () { return setIDToToughnessLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('IDToCMC').then(function () { return setIDToCMCLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('IDToLegalFormat').then(function () { return setIDToLegalFormatLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('IDToSetCode').then(function () { return setIDToSetCodeLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('SetCodeToRelease').then(function () { return setSetCodeToReleaseLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('IDToTokenStrings').then(function () { return setIDToTokenStringsLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('TokenIDToTokenString').then(function () { return setTokenIDToTokenStringLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('TokenIDToName').then(function () { return setTokenIDToNameLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('TokenIDToLargeImageURI').then(function () { return setTokenIDToLargeImageURILoaded(true); }));
            remainingPromises.push(props.loader.getMapData('FrontIDToBackID').then(function () { return setFrontIDToBackIDLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('BackIDToLargeImageURI').then(function () { return setBackIDToLargeImageURILoaded(true); }));
            remainingPromises.push(props.loader.getMapData('SetCodeToSetName').then(function () { return setSetCodeToSetNameLoaded(true); }));
            remainingPromises.push(props.loader.getMapData('IDToCost').then(function () { return setIDToCostLoaded(true); }));
            /* eslint-enable max-len */
            Promise.all(remainingPromises).then(function () {
                setIsOpen(false);
            });
        });
    }, []);
    if (!isOpen) {
        return react_1.default.createElement("div", null, "whatthef");
    }
    function createLoadingIndicator(loaded, name) {
        if (loaded) {
            return null;
        }
        return react_1.default.createElement("div", { style: { paddingLeft: '18px', fontSize: '18px' } },
            name,
            "...");
    }
    return react_1.default.createElement("div", { "data-whatthef": 'urmum', style: {
            width: '300px',
            position: 'absolute',
            right: '50px',
            bottom: '50px',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '3px solid #cdd6e4',
            padding: '18px',
            fontSize: '18px',
            opacity: '.5',
        }, onMouseUp: function (e) { return e.stopPropagation(); } },
        react_1.default.createElement("div", { style: { fontWeight: 'bold' } }, "Loading data required for searching and exporting."),
        createLoadingIndicator(isIDToRarityLoaded, 'IDToRarity'),
        createLoadingIndicator(isIDToColorLoaded, 'IDToColor'),
        createLoadingIndicator(isIDToColorIdentityLoaded, 'IDToColorIdentity'),
        createLoadingIndicator(isIDToSupertypeLoaded, 'IDToSupertype'),
        createLoadingIndicator(isIDToTypeLoaded, 'IDToType'),
        createLoadingIndicator(isIDToSubtypeLoaded, 'IDToSubtype'),
        createLoadingIndicator(isIDToPowerLoaded, 'IDToPower'),
        createLoadingIndicator(isIDToToughnessLoaded, 'IDToToughness'),
        createLoadingIndicator(isIDToCMCLoaded, 'IDToCMC'),
        createLoadingIndicator(isIDToLegalFormatLoaded, 'IDToLegalFormat'),
        createLoadingIndicator(isIDToSetCodeLoaded, 'IDToSetCode'),
        createLoadingIndicator(isSetCodeToReleaseLoaded, 'SetCodeToRelease'),
        createLoadingIndicator(isIDToTokenStringsLoaded, 'IDToTokenStrings'),
        createLoadingIndicator(isTokenIDToTokenStringLoaded, 'TokenIDToTokenString'),
        createLoadingIndicator(isTokenIDToNameLoaded, 'TokenIDToName'),
        createLoadingIndicator(isTokenIDToLargeImageURILoaded, 'TokenIDToLargeImageURI'),
        createLoadingIndicator(isFrontIDToBackIDLoaded, 'FrontIDToBackID'),
        createLoadingIndicator(isBackIDToLargeImageURILoaded, 'BackIDToLargeImageURI'),
        createLoadingIndicator(isSetCodeToSetNameLoaded, 'SetCodeToSetName'),
        createLoadingIndicator(isIDToCostLoaded, 'IDToCost'));
}
exports.default = loadingWindow;
//# sourceMappingURL=secondary_load_window.js.map