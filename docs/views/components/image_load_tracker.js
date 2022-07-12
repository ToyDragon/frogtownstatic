"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageLoadTracker = /** @class */ (function () {
    function ImageLoadTracker() {
        this.loadedUrls = {};
    }
    ImageLoadTracker.prototype.setURLIsLoaded = function (url) {
        this.loadedUrls[url] = true;
    };
    ImageLoadTracker.prototype.getURLIsLoaded = function (url) {
        return this.loadedUrls[url] === true;
    };
    return ImageLoadTracker;
}());
exports.default = ImageLoadTracker;
//# sourceMappingURL=image_load_tracker.js.map