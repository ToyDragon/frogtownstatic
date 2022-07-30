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
var InfoWindow = (0, react_1.forwardRef)(function InfoWindow(props, ref) {
    var _a = (0, react_1.useState)(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = (0, react_1.useState)(''), legacyPublicId = _b[0], setLegacyPublicId = _b[1];
    var _c = (0, react_1.useState)(''), legacyBetaPublicId = _c[0], setLegacyBetaPublicId = _c[1];
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        open: function (legacyPublicId, legacyBetaPublicId) {
            setIsOpen(true);
            console.log('Opening with ids ' + legacyPublicId, legacyBetaPublicId);
            setLegacyPublicId(legacyPublicId);
            setLegacyBetaPublicId(legacyBetaPublicId);
        },
    }); });
    if (!isOpen) {
        return null;
    }
    var discordLogo = react_1.default.createElement("a", { href: "https://discord.gg/Yv8kY2m" },
        react_1.default.createElement("img", { src: "icons/Discord-Logo+Wordmark-Color64.png", style: { width: '117px' } }));
    var githubLogo = react_1.default.createElement("a", { href: "https://github.com/ToyDragon/frogtownstatic" },
        react_1.default.createElement("img", { src: "icons/GitHub_Logo64.png", style: { width: '64px', marginLeft: '-4px' } }));
    return react_1.default.createElement("div", { style: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            backgroundColor: '#00000070',
            zIndex: '6',
        }, onMouseUp: function (e) {
            if (e.button === 0) {
                setIsOpen(false);
            }
        } },
        react_1.default.createElement("div", { style: {
                width: '600px',
                height: '600px',
                position: 'absolute',
                left: 'calc(50% - 300px)',
                top: 'calc(50% - 300px)',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '3px solid #cdd6e4',
                padding: '16px',
            }, onMouseUp: function (e) { return e.stopPropagation(); } },
            react_1.default.createElement("div", { style: {
                    fontSize: '24px',
                } }, "Frogtown"),
            react_1.default.createElement("div", { style: { marginTop: '12px' } }),
            react_1.default.createElement("div", null, "All of your decks are stored locally here in your browser, so if you cleared your browser's cache that may have caused your decks to disappear. If you exported your decks as JSON files you can drop/drop them onto the page."),
            react_1.default.createElement("div", { style: { marginTop: '12px' } }),
            react_1.default.createElement("div", null, "If you are having issues or would like to suggest changes, join the Discord channel and let us know. If you're a developer and want to contribute to the site, check out our GitHub repository."),
            react_1.default.createElement("div", { style: { marginTop: '12px' } }),
            react_1.default.createElement("div", null, discordLogo),
            react_1.default.createElement("div", null, githubLogo),
            react_1.default.createElement("div", { style: { marginTop: '12px' } }),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", null, "If you're missing decks from the old version of frogtown, here you can attempt to import the decks again."),
                react_1.default.createElement("div", null,
                    !legacyPublicId ? null : react_1.default.createElement("button", { className: "btn btn-primary", style: { marginRight: '8px' }, onMouseUp: function (e) {
                            if (e.button === 0) {
                                props.onReexport(legacyPublicId);
                            }
                        } }, "Import WWW Decks"),
                    !legacyBetaPublicId ? null : react_1.default.createElement("button", { className: "btn btn-primary", style: { marginRight: '8px' }, onMouseUp: function (e) {
                            if (e.button === 0) {
                                props.onReexport(legacyBetaPublicId);
                            }
                        } }, "Import Beta Decks"),
                    react_1.default.createElement("button", { className: "btn btn-primary", onMouseUp: function (e) {
                            if (e.button === 0) {
                                setIsOpen(false);
                                props.onPrivateId();
                            }
                        } }, "Import With Private ID"))),
            react_1.default.createElement("div", { style: { fontSize: '12px', color: '#555555', position: 'absolute', bottom: '37px', padding: '12px' } }, "Portions of Frogtown are unofficial Fan Content permitted under the Wizards of the Coast Fan Content Policy. The literal and graphical information presented on this site about Magic: The Gathering, including card images, the mana symbols, and Oracle text, is copyright Wizards of the Coast, LLC, a subsidiary of Hasbro, Inc. Frogtown is not produced by, endorsed by, supported by, or affiliated with Wizards of the Coast."),
            react_1.default.createElement("div", { style: { position: 'absolute', right: '12px', bottom: '12px' } },
                react_1.default.createElement("button", { className: 'btn btn-secondary', onMouseUp: function (e) {
                        if (e.button === 0) {
                            setIsOpen(false);
                        }
                    }, onKeyDown: function (e) {
                        if (e.key === 'Enter' || e.key === ' ') {
                            setIsOpen(false);
                        }
                    } }, "Close"))));
});
exports.default = InfoWindow;
//# sourceMappingURL=info_window.js.map