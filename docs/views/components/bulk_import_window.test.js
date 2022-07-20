"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var memory_data_loader_1 = require("../../data/memory_data_loader");
var bulk_import_window_1 = require("./bulk_import_window");
it('handles exact matches', function () {
    var mockLoader = new memory_data_loader_1.MemoryDataLoader();
    mockLoader.setMapDataLoaded('IDToName', { 'id_a': 'name_a', 'id_a2': 'name_a', 'id_b': 'name_b' });
    mockLoader.setMapDataLoaded('IDToSetCode', { 'id_a': 'set_a', 'id_a2': 'set_a2', 'id_b': 'set_b' });
    expect((0, bulk_import_window_1.parseCards)(mockLoader, "name_a")).toEqual({ mainboard: ['id_a'], sideboard: [], errors: [] });
    expect((0, bulk_import_window_1.parseCards)(mockLoader, "1 name_a")).toEqual({ mainboard: ['id_a'], sideboard: [], errors: [] });
    expect((0, bulk_import_window_1.parseCards)(mockLoader, "1x name_a")).toEqual({ mainboard: ['id_a'], sideboard: [], errors: [] });
    expect((0, bulk_import_window_1.parseCards)(mockLoader, "2 name_a")).toEqual({ mainboard: ['id_a', 'id_a'], sideboard: [], errors: [] });
    expect((0, bulk_import_window_1.parseCards)(mockLoader, "2x name_a")).toEqual({ mainboard: ['id_a', 'id_a'], sideboard: [], errors: [] });
});
it('handles specific sets', function () {
    var mockLoader = new memory_data_loader_1.MemoryDataLoader();
    mockLoader.setMapDataLoaded('IDToName', { 'id_a': 'name_a', 'id_a2': 'name_a', 'id_b': 'name_b' });
    mockLoader.setMapDataLoaded('IDToSetCode', { 'id_a': 'set_a', 'id_a2': 'set_a2', 'id_b': 'set_b' });
    expect((0, bulk_import_window_1.parseCards)(mockLoader, "name_a <set_a>")).toEqual({ mainboard: ['id_a'], sideboard: [], errors: [] });
    expect((0, bulk_import_window_1.parseCards)(mockLoader, "1 name_a <set_a>")).toEqual({ mainboard: ['id_a'], sideboard: [], errors: [] });
    expect((0, bulk_import_window_1.parseCards)(mockLoader, "name_a <set_a2>")).toEqual({ mainboard: ['id_a2'], sideboard: [], errors: [] });
    expect((0, bulk_import_window_1.parseCards)(mockLoader, "1 name_a <set_a2>")).toEqual({ mainboard: ['id_a2'], sideboard: [], errors: [] });
    expect((0, bulk_import_window_1.parseCards)(mockLoader, "name_a <set_b>").errors.length).toEqual(1);
});
it('handles sideboard', function () {
    var mockLoader = new memory_data_loader_1.MemoryDataLoader();
    mockLoader.setMapDataLoaded('IDToName', { 'id_a': 'name_a', 'id_a2': 'name_a', 'id_b': 'name_b' });
    mockLoader.setMapDataLoaded('IDToSetCode', { 'id_a': 'set_a', 'id_a2': 'set_a2', 'id_b': 'set_b' });
    expect((0, bulk_import_window_1.parseCards)(mockLoader, "name_a\nSIDEBOARD\nname_b"))
        .toEqual({ mainboard: ['id_a'], sideboard: ['id_b'], errors: [] });
});
//# sourceMappingURL=bulk_import_window.test.js.map