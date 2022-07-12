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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function colorBlock(color) {
    return react_1.default.createElement("div", { className: "", style: {
            display: "inline-block",
            width: "20px",
            height: "15px",
            transform: "skew(20deg)",
            border: "1px solid",
            marginLeft: "3px",
            background: "linear-gradient(90deg, " + color + ", #3e3f2b)",
            borderColor: "#3e3f2b",
        } });
}
function headerDeckPreview() {
    var fillParent = {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
    };
    return react_1.default.createElement("div", { "data-deckid": "2r4kz71pxa2dbnmulw459trx", style: {
            position: "relative",
            width: "220px",
            height: "160px",
            border: "3px solid #303b4c",
            borderRadius: "6px",
            display: "inline-block",
            color: "white",
            verticalAlign: "top",
            cursor: "pointer",
            marginBottom: "10px",
            marginRight: "4px",
        } },
        react_1.default.createElement("div", { className: "cardBg full", style: __assign(__assign({}, fillParent), { backgroundImage: "url(\"https://s3-us-west-2.amazonaws.com/frogtown.apricot.images.compressed.lq/3d637cb2-b770-4637-a75c-c2ed9e562538.jpg\")", backgroundPosition: "-24px -44px", backgroundSize: "269px 375px" }) }),
        react_1.default.createElement("div", { className: "tbDeckGradiant", style: __assign({}, fillParent) }),
        react_1.default.createElement("div", { className: "metadata" },
            react_1.default.createElement("div", { className: "highlight metarow", style: {
                    width: "100%",
                    position: "absolute",
                    top: "3px",
                    opacity: "0.5",
                    backgroundColor: "white",
                    height: "20px",
                } }),
            react_1.default.createElement("div", { className: "colors metarow", style: {
                    width: "100%",
                    textAlign: "right",
                    position: "relative",
                    right: "5px",
                    top: "4px",
                } },
                colorBlock("#e2ddbf"),
                colorBlock("#3d8acb"),
                colorBlock("#d04035")),
            react_1.default.createElement("div", { className: "cardcount metarow", style: {
                    width: "100%",
                    position: "absolute",
                    top: "3px",
                    paddingLeft: "10px",
                    color: "#242424",
                    fontSize: "18px",
                    marginTop: "-2px",
                } }, "243 Cards")),
        react_1.default.createElement("div", { className: "tbDeckName", style: {
                display: "block",
                width: "calc(100% - 10px)",
                position: "absolute",
                left: "5px",
                bottom: "5px",
                fontSize: "24px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                pointerEvents: "none",
            } }, "Lightweight Scrying Planet"));
}
exports.default = headerDeckPreview;
//# sourceMappingURL=header_deck_display.js.map