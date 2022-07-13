"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryDataLoader = void 0;
var MemoryDataLoader = /** @class */ (function () {
    function MemoryDataLoader() {
        this.mapLoadPromise = {};
        this.loadedMaps = {};
        this.mapLoadResolvers = {};
    }
    MemoryDataLoader.prototype.setMapDataLoaded = function (mapName, data) {
        this.getAnyMapData(mapName); // Ensure the resolver has been initialized.
        this.mapLoadResolvers[mapName](data);
    };
    MemoryDataLoader.prototype.getAnyMapData = function (mapName) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.getMapData(mapName);
    };
    MemoryDataLoader.prototype.getMapData = function (mapName) {
        var _this = this;
        if (!this.mapLoadPromise[mapName]) {
            this.mapLoadPromise[mapName] = new Promise(function (resolve) {
                _this.mapLoadResolvers[mapName] = function (data) {
                    delete _this.mapLoadResolvers[mapName];
                    _this.loadedMaps[mapName] = data;
                    resolve(data);
                };
            });
        }
        return this.mapLoadPromise[mapName];
    };
    MemoryDataLoader.prototype.getMapDataSync = function (mapName) {
        return this.loadedMaps[mapName];
    };
    return MemoryDataLoader;
}());
exports.MemoryDataLoader = MemoryDataLoader;
//# sourceMappingURL=memory_data_loader.js.map