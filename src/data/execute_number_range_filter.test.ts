import executeNumberRangeFilter from './execute_number_range_filter';

it('Handles valid filters', () => {
  const cardIds = ['a', 'b', 'c', 'd'];
  expect(executeNumberRangeFilter(cardIds, {'b': 1, 'c': 3, 'd': 5}, '2-4')).toEqual({
    'c': 1,
  });

  expect(executeNumberRangeFilter(cardIds, {'b': 1, 'c': 3, 'd': 5}, '-4')).toEqual({
    'b': 1,
    'c': 1,
  });

  expect(executeNumberRangeFilter(cardIds, {'b': 1, 'c': 3, 'd': 5}, '2-')).toEqual({
    'c': 1,
    'd': 1,
  });

  expect(executeNumberRangeFilter(cardIds, {'b': 1, 'c': 3, 'd': 5}, '1-3')).toEqual({
    'b': 1,
    'c': 1,
  });

  expect(executeNumberRangeFilter(cardIds, {'b': 1, 'c': 3, 'd': 5}, '3-5')).toEqual({
    'c': 1,
    'd': 1,
  });
});

it('Handles invalid filters', () => {
  expect(executeNumberRangeFilter([], {'b': 1, 'c': 3, 'd': 5}, '')).toBeFalsy();
  expect(executeNumberRangeFilter([], null, '1-3')).toBeFalsy();
});
