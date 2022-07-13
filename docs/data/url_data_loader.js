"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlDataLoader = void 0;
var UrlDataLoader = /** @class */ (function () {
    /**
     * @param baseUrl String containing {MapName}, like
     * "https://s3-us-west-2.amazonaws.com/frogtown.apricot.data/{MapName}.json"
     */
    function UrlDataLoader(baseUrl, jsonRequestHelper) {
        this.mapLoadPromise = {};
        this.loadedMaps = {};
        this.baseUrl = baseUrl;
        this.jsonRequestHelper = jsonRequestHelper;
    }
    UrlDataLoader.prototype.getAnyMapData = function (mapName) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.getMapData(mapName);
    };
    UrlDataLoader.prototype.getMapData = function (mapName) {
        var _this = this;
        if (!this.mapLoadPromise[mapName]) {
            this.mapLoadPromise[mapName] = new Promise(function (resolve) {
                _this.jsonRequestHelper(_this.baseUrl.replace(/\{MapName\}/g, mapName)).then(function (result) {
                    _this.loadedMaps[mapName] = result;
                    resolve(result);
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