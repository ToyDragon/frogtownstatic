"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UrlDataLoader = /** @class */ (function () {
    /**
     * @param baseUrl String containing {MapName}, like
     * "https://s3-us-west-2.amazonaws.com/frogtown.apricot.data/{MapName}.json"
     */
    function UrlDataLoader(baseUrl) {
        this.mapLoadPromise = {};
        this.loadedMaps = {};
        this.baseUrl = baseUrl;
    }
    UrlDataLoader.prototype.getAnyMapData = function (mapName) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.getMapData(mapName);
    };
    UrlDataLoader.prototype.getMapData = function (mapName) {
        var _this = this;
        if (!this.mapLoadPromise[mapName]) {
            this.mapLoadPromise[mapName] = new Promise(function (resolve) {
                fetch(_this.baseUrl.replace(/\{MapName\}/g, mapName)).then(function (response) {
                    response.json().then(function (jsonResponse) {
                        _this.loadedMaps[mapName] = jsonResponse;
                        resolve(jsonResponse);
                    });
                });
            });
        }
        return this.mapLoadPromise[mapName];
    };
    UrlDataLoader.prototype.getMapDataSync = function (mapName) {
        return this.loadedMaps[mapName];
    };
    return UrlDataLoader;
}());
exports.UrlDataLoader = UrlDataLoader;
//# sourceMappingURL=url_data_loader.js.map