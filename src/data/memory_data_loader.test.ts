import {MemoryDataLoader} from './memory_data_loader';

it('Provides test data', async () => {
  const dataLoader = new MemoryDataLoader();
  const nameMap = {'a': 'test'};
  const namePromise = dataLoader.getMapData('IDToName');
  dataLoader.setMapDataLoaded('IDToName', nameMap);
  expect(await namePromise).toBe(nameMap);
});

it('Can hold until', async () => {
  const nameMap = {'a': 'test'};
  const dataLoader = new MemoryDataLoader();
  let endHold!: () => void;
  dataLoader.holdUntil(new Promise<void>((resolve) => {
    endHold = resolve;
  }));
  let dataLoaded = false;
  dataLoader.getMapData('IDToName').then(() => {
    dataLoaded = true;
  });
  dataLoader.setMapDataLoaded('IDToName', nameMap);
  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(dataLoaded).toBeFalsy();
  endHold();
  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(dataLoaded).toBeTruthy();
});
