"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("react-dom/client");
var react_1 = __importDefault(require("react"));
var url_data_loader_1 = require("../data/url_data_loader");
var image_load_tracker_1 = __importDefault(require("./components/image_load_tracker"));
var url_loader_1 = __importDefault(require("./components/url_loader"));
var index_page_1 = __importDefault(require("./index_page"));
var loader = new url_data_loader_1.UrlDataLoader('https://s3-us-west-2.amazonaws.com/frogtown.apricot.data/{MapName}.json');
var root = client_1.createRoot(document.getElementById('content'));
var imageLoadTracker = new image_load_tracker_1.default();
var urlLoader = new url_loader_1.default();
root.render(react_1.default.createElement(index_page_1.default, { imageLoadTracker: imageLoadTracker, loader: loader, urlLoader: urlLoader }));
//# sourceMappingURL=index.js.map