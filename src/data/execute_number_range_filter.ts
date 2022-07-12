/**
 * Removes ids from `cardIds` if they don't pass the filter.
 * @param cardIds
 * @param map
 * @param filterValue string in the format "minvalue-maxvalue", where min or
 *                    max can be missing to specify a one sided range.
 * @returns true if filter was applied
 */
export default function executeNumberRangeFilter(
    cardIds: string[],
    map: Record<string, string | number> | null,
    filterValue: string,
): boolean {
  if (!filterValue || !map) {
    return false;
  }
  const result = /^([0-9]*)(-)?([0-9]*)?$/.exec(filterValue);
  if (!result) {
    return false;
  }
  let min: string | undefined | number = result[1];
  let max: string | undefined | number = result[3];

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

  for (let i = cardIds.length - 1; i >= 0; i--) {
    const cardValue = Number(map[cardIds[i]]);
    if (Number.isNaN(cardValue) ||
      (typeof min !== 'undefined' && cardValue < min) ||
      (typeof max !== 'undefined' && cardValue > max)) {
      cardIds.splice(i, 1);
    }
  }

  return true;
}
