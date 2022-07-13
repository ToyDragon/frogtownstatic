import {MemoryDataLoader} from './memory_data_loader';

it('Provides test data', async () => {
  const dataLoader = new MemoryDataLoader();
  const nameMap = {'a': 'test'};
  const namePromise = dataLoader.getMapData('IDToName');
  dataLoader.setMapDataLoaded('IDToName', nameMap);
  expect(await namePromise).toBe(nameMap);
});
