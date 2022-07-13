import {MemoryDataLoader} from '../../data/memory_data_loader';
import {parseCards} from './bulk_import_window';

it('handles exact matches', () => {
  const mockLoader = new MemoryDataLoader();
  mockLoader.setMapDataLoaded('IDToName', {'id_a': 'name_a', 'id_a2': 'name_a', 'id_b': 'name_b'});
  mockLoader.setMapDataLoaded('IDToSetCode', {'id_a': 'set_a', 'id_a2': 'set_a2', 'id_b': 'set_b'});
  expect(parseCards(mockLoader, `name_a`)).toEqual({ids: ['id_a'], errors: []});
  expect(parseCards(mockLoader, `1 name_a`)).toEqual({ids: ['id_a'], errors: []});
  expect(parseCards(mockLoader, `1x name_a`)).toEqual({ids: ['id_a'], errors: []});
  expect(parseCards(mockLoader, `2 name_a`)).toEqual({ids: ['id_a', 'id_a'], errors: []});
  expect(parseCards(mockLoader, `2x name_a`)).toEqual({ids: ['id_a', 'id_a'], errors: []});
});

it('handles specific sets', () => {
  const mockLoader = new MemoryDataLoader();
  mockLoader.setMapDataLoaded('IDToName', {'id_a': 'name_a', 'id_a2': 'name_a', 'id_b': 'name_b'});
  mockLoader.setMapDataLoaded('IDToSetCode', {'id_a': 'set_a', 'id_a2': 'set_a2', 'id_b': 'set_b'});
  expect(parseCards(mockLoader, `name_a <set_a>`)).toEqual({ids: ['id_a'], errors: []});
  expect(parseCards(mockLoader, `1 name_a <set_a>`)).toEqual({ids: ['id_a'], errors: []});
  expect(parseCards(mockLoader, `name_a <set_a2>`)).toEqual({ids: ['id_a2'], errors: []});
  expect(parseCards(mockLoader, `1 name_a <set_a2>`)).toEqual({ids: ['id_a2'], errors: []});
  expect(parseCards(mockLoader, `name_a <set_b>`).errors.length).toEqual(1);
});
