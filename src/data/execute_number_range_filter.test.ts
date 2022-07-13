import executeNumberRangeFilter from './execute_number_range_filter';

it('Handles valid filters', () => {
  let cardIds = ['a', 'b', 'c', 'd'];
  expect(executeNumberRangeFilter(cardIds, {'b': 1, 'c': 3, 'd': 5}, '2-4')).toBeTruthy();
  expect(cardIds).toEqual(['c']);

  cardIds = ['a', 'b', 'c', 'd'];
  expect(executeNumberRangeFilter(cardIds, {'b': 1, 'c': 3, 'd': 5}, '-4')).toBeTruthy();
  expect(cardIds).toEqual(['b', 'c']);

  cardIds = ['a', 'b', 'c', 'd'];
  expect(executeNumberRangeFilter(cardIds, {'b': 1, 'c': 3, 'd': 5}, '2-')).toBeTruthy();
  expect(cardIds).toEqual(['c', 'd']);

  cardIds = ['a', 'b', 'c', 'd'];
  expect(executeNumberRangeFilter(cardIds, {'b': 1, 'c': 3, 'd': 5}, '1-3')).toBeTruthy();
  expect(cardIds).toEqual(['b', 'c']);

  cardIds = ['a', 'b', 'c', 'd'];
  expect(executeNumberRangeFilter(cardIds, {'b': 1, 'c': 3, 'd': 5}, '3-5')).toBeTruthy();
  expect(cardIds).toEqual(['c', 'd']);
});

it('Handles invalid filters', () => {
  expect(executeNumberRangeFilter([], {'b': 1, 'c': 3, 'd': 5}, '')).toBeFalsy();
  expect(executeNumberRangeFilter([], null, '1-3')).toBeFalsy();
});
