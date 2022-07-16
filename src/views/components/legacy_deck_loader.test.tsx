import MemoryUrlLoader from './memory_url_loader';
import loadLegacyDecksInitial, {LegacyUserData, loadLegacyDecksForPublicId} from '../legacy_deck_loader';


it('loads decks for specific id', async () => {
  const urlLoader = new MemoryUrlLoader();
  let loaded = false;
  const loadPromise = loadLegacyDecksForPublicId('a', [], urlLoader as any).then((decks) => {
    loaded = true;
    return decks;
  });
  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(loaded).toBeFalsy();
  const legacyData: LegacyUserData = {
    cardbackUrl: 'test.com/wow.png',
    decks: [
      {
        name: 'wow',
        keycard: 'b',
        mainboard: ['c', 'd', 'd'],
        sideboard: ['c', 'e'],
      },
    ],
  };
  urlLoader.setLoaded(`https://s3.us-west-2.amazonaws.com/frogtown.userdecklists/${'a'}.json`, JSON.stringify(legacyData));
  const newDecks = await loadPromise;
  expect(newDecks).toEqual([{
    backgroundUrl: legacyData.cardbackUrl,
    ...legacyData.decks[0],
  }]);
});

it('doesnt add duplicate decks', async () => {
  const originalDecks = [
    {
      name: 'a',
      keycard: 'b',
      backgroundUrl: 'test.com/wow.png',
      mainboard: ['a', 'b'],
      sideboard: ['c'],
    },
  ];

  const legacyData: LegacyUserData = {
    cardbackUrl: 'test.com/wow.png',
    decks: [
      { // Same as original deck
        name: 'a',
        keycard: 'b',
        mainboard: ['a', 'b'],
        sideboard: ['c'],
      },
      { // New unique deck
        name: 'wow',
        keycard: 'b',
        mainboard: ['c', 'd', 'd'],
        sideboard: ['c', 'e'],
      },
    ],
  };

  const urlLoader = new MemoryUrlLoader();
  urlLoader.setLoaded(`https://s3.us-west-2.amazonaws.com/frogtown.userdecklists/${'a'}.json`, JSON.stringify(legacyData));

  const newDecks = await loadLegacyDecksForPublicId('a', [...originalDecks], urlLoader as any);
  expect(newDecks).toEqual([
    originalDecks[0],
    {
      backgroundUrl: 'test.com/wow.png',
      ...legacyData.decks[1],
    },
  ]);
});

it('parses ids correctly', async () => {
  const urlLoader = new MemoryUrlLoader();
  const legacyWWWData: LegacyUserData = {
    cardbackUrl: 'test.com/wow.png',
    decks: [
      {
        name: 'wow',
        keycard: 'b',
        mainboard: ['a', 'b'],
        sideboard: ['c'],
      },
    ],
  };
  urlLoader.setLoaded(`https://s3.us-west-2.amazonaws.com/frogtown.userdecklists/${'abc123_www'}.json`, JSON.stringify(legacyWWWData));
  urlLoader.setLoaded(`https://s3.us-west-2.amazonaws.com/frogtown.userdecklists/${'abc123_beta'}.json`, '{}');

  const fnSetId = jest.fn((_id: string) => 0);
  const fnSetBetaId = jest.fn((_id: string) => 0);
  const storage = {
    getItem: jest.fn((_key: string) => null),
    setItem: jest.fn((_key: string, _val: string) => null),
  };

  // This call with timeout if it's not finding the two specified IDs.
  const newDecks = await loadLegacyDecksInitial([],
      fnSetId,
      fnSetBetaId,
      '?legacyBetaPublicId=abc123_beta',
      'privateId=longprivateidwow12345678; publicId=abc123_www; DeckViewerDeck=0',
      urlLoader as any,
      storage);
  expect(newDecks?.length).toEqual(1);
  expect(fnSetBetaId.mock.calls[0][0]).toEqual('abc123_beta');
  expect(storage.setItem.mock.calls[0][0]).toEqual('legacy_beta_public_id');
  expect(storage.setItem.mock.calls[0][1]).toEqual('abc123_beta');

  expect(fnSetId.mock.calls[0][0]).toEqual('abc123_www');
  expect(storage.setItem.mock.calls[1][0]).toEqual('legacy_public_id');
  expect(storage.setItem.mock.calls[1][1]).toEqual('abc123_www');
});
