"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Removes ids from `cardIds` if they don't pass the filter.
 * @param cardIds
 * @param map
 * @param filterValue string in the format "minvalue-maxvalue", where min or
 *                    max can be missing to specify a one sided range.
 * @returns true if filter was applied
 */
function executeNumberRangeFilter(cardIds, map, filterValue) {
    if (!filterValue || !map) {
        return false;
    }
    var result = /^([0-9]*)(-)?([0-9]*)?$/.exec(filterValue);
    if (!result) {
        return false;
    }
    var min = result[1];
    var max = result[3];
    if (typeof min === 'undefined' && typeof max === 'undefined') {
        return false;
    }
    if (typeof result[2] === 'undefined') {
        max = min;
    }
    if (typeof min !== 'undefined') {
        min = Number(min);
    }
    if (typeof max !== 'undefined') {
        max = Number(max);
    }
    if (typeof min !== 'undefined' && typeof max !== 'undefined' && min > max) {
        return false;
    }
    for (var i = cardIds.length - 1; i >= 0; i--) {
        var cardValue = Number(map[cardIds[i]]);
        if (Number.isNaN(cardValue) ||
            (typeof min !== 'undefined' && cardValue < min) ||
            (typeof max !== 'undefined' && cardValue > max)) {
            cardIds.splice(i, 1);
        }
    }
    return true;
}
exports.default = executeNumberRangeFilter;
//# sourceMappingURL=execute_number_range_filter.js.map