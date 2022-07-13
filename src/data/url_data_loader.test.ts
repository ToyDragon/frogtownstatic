import {UrlDataLoader} from './url_data_loader';

it('Provides data', async () => {
  const resolvers: Record<string, (val: unknown) => void> = {};
  const dataLoader = new UrlDataLoader('www.test.com/{MapName}.json', (url: string) => {
    const p = new Promise((resolve) => {
      resolvers[url] = resolve;
    });
    return p;
  });
  const namePromise = dataLoader.getMapData('IDToName');
  expect(resolvers['www.test.com/IDToName.json']).toBeTruthy();
  const nameMap = {'a': 'ATEST'};
  resolvers['www.test.com/IDToName.json'](nameMap);
  expect(await namePromise).toBe(nameMap);
});
