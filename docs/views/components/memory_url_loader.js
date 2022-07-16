"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: move this to data, use interface.
var MemoryURLLoader = /** @class */ (function () {
    function MemoryURLLoader() {
        this.urlToResolver = {};
        this.urlToPromise = {};
    }
    MemoryURLLoader.prototype.load = function (url) {
        var _this = this;
        if (typeof this.urlToPromise[url] === 'undefined') {
            this.urlToPromise[url] = new Promise(function (resolve) {
                _this.urlToResolver[url] = resolve;
            });
        }
        return this.urlToPromise[url];
    };
    MemoryURLLoader.prototype.setLoaded = function (url, data) {
        if (this.urlToResolver[url]) {
            this.urlToResolver[url](data);
        }
        else {
            this.urlToPromise[url] = Promise.resolve(data);
        }
    };
    return MemoryURLLoader;
}());
exports.default = MemoryURLLoader;
//# sourceMappingURL=memory_url_loader.js.map