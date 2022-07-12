"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var URLLoader = /** @class */ (function () {
    function URLLoader() {
        this.urlToPromise = {};
    }
    URLLoader.prototype.load = function (url) {
        if (typeof this.urlToPromise[url] === 'undefined') {
            this.urlToPromise[url] = new Promise(function (resolve, reject) {
                fetch(url).then(function (response) {
                    response.text().then(resolve).catch(reject);
                }).catch(reject);
            });
        }
        return this.urlToPromise[url];
    };
    return URLLoader;
}());
exports.default = URLLoader;
//# sourceMappingURL=url_loader.js.map