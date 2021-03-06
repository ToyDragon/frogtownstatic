"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var execute_number_range_filter_1 = __importDefault(require("./execute_number_range_filter"));
it('Handles valid filters', function () {
    var cardIds = ['a', 'b', 'c', 'd'];
    expect((0, execute_number_range_filter_1.default)(cardIds, { 'b': 1, 'c': 3, 'd': 5 }, '2-4')).toEqual({
        'c': 1,
    });
    expect((0, execute_number_range_filter_1.default)(cardIds, { 'b': 1, 'c': 3, 'd': 5 }, '-4')).toEqual({
        'b': 1,
        'c': 1,
    });
    expect((0, execute_number_range_filter_1.default)(cardIds, { 'b': 1, 'c': 3, 'd': 5 }, '2-')).toEqual({
        'c': 1,
        'd': 1,
    });
    expect((0, execute_number_range_filter_1.default)(cardIds, { 'b': 1, 'c': 3, 'd': 5 }, '1-3')).toEqual({
        'b': 1,
        'c': 1,
    });
    expect((0, execute_number_range_filter_1.default)(cardIds, { 'b': 1, 'c': 3, 'd': 5 }, '3-5')).toEqual({
        'c': 1,
        'd': 1,
    });
});
it('Handles invalid filters', function () {
    expect((0, execute_number_range_filter_1.default)([], { 'b': 1, 'c': 3, 'd': 5 }, '')).toBeFalsy();
    expect((0, execute_number_range_filter_1.default)([], null, '1-3')).toBeFalsy();
});
//# sourceMappingURL=execute_number_range_filter.test.js.map