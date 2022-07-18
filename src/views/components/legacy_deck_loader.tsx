import {createNewDeck, Deck} from '../../data/deck';
import {FrogtownStorage} from '../../data/storage';
import URLLoader from './url_loader';

export interface LegacyUserData {
  cardbackUrl: string;
  decks: {
    name: string;
    keycard: string;
    mainboard: string[];
    sideboard: string[];
  }[];
}

export async function loadLegacyDecksForPublicId(
    legacyPublicId: string,
    existingDecks: Deck[],
    urlLoader: URLLoader,
): Promise<Deck[]> {
  let loadedDecks: Deck[] = [];
  try {
    const userData: LegacyUserData = JSON.parse(await urlLoader.load(`https://s3.us-west-2.amazonaws.com/frogtown.userdecklists/${legacyPublicId}.json`));
    console.log(userData);
    let cardback = 'https://i.imgur.com/Hg8CwwU.jpeg';
    if (userData.cardbackUrl && userData.cardbackUrl.indexOf('frogtown.me') === -1) {
      cardback = userData.cardbackUrl;
    }
    loadedDecks = userData.decks.map((a) => {
      // Ensure we don't let poorly formatted decks in.
      return {
        name: a.name,
        keycard: a.keycard || a.mainboard[0] || a.sideboard[0] || '4b81165e-f091-4211-8b47-5ea6868b0d4c',
        mainboard: a.mainboard,
        sideboard: a.sideboard,
        backgroundUrl: cardback,
      };
    });
    for (let i = loadedDecks.length - 1; i >= 0; i--) {
      const mainboardStr = [...loadedDecks[i].mainboard].sort().join(',');
      const sideboardStr = [...loadedDecks[i].sideboard].sort().join(',');
      for (const existingDeck of existingDecks) {
        if (mainboardStr === [...existingDeck.mainboard].sort().join(',') &&
            sideboardStr === [...existingDeck.sideboard].sort().join(',')) {
          loadedDecks.splice(i, 1);
        }
      }
    }
    // TODO: Toast about importing decks.
  } catch (e) {
    console.error('Unable to load decks from legacy account.');
  }
  return loadedDecks;
}

export default async function loadLegacyDecksInitial(decks: Deck[],
    setLegacyPublicId: (id: string) => unknown,
    setLegacyBetaPublicId: (id: string) => unknown,
    search: string,
    cookie: string,
    urlLoader: URLLoader,
    storage: FrogtownStorage,
): Promise<Deck[] | null> {
  const decksOnlyContainedStarter = decks.length === 1 &&
      JSON.stringify(decks[0]) === JSON.stringify(createNewDeck(1));
  const legacyBetaPublicId = (
    (search.split('?')[1] || '')
        .split('&')
        .filter((v) => v.indexOf('legacyBetaPublicId') === 0)[0] || ''
  ).split('=')[1] || await storage.get('legacy_beta_public_id');
  setLegacyBetaPublicId(legacyBetaPublicId || '');
  if (legacyBetaPublicId && await storage.get('legacy_beta_public_id') !== legacyBetaPublicId) {
    await storage.set('legacy_beta_public_id', legacyBetaPublicId);
    console.log('Loading legacy deck for beta public id ', legacyBetaPublicId);
    const newlyLoadedDecks = await loadLegacyDecksForPublicId(legacyBetaPublicId, decks, urlLoader);
    decks.splice(decks.length, 0, ...newlyLoadedDecks);
  }

  if (cookie) {
    const parsedId = cookie
        .split(';')
        .filter((a) => !!a)
        .map((a) => ({key: a.split('=')[0].trim(), value: a.split('=')[1].trim()}))
        .filter((a) => a.key === 'publicId')[0].value;
    setLegacyPublicId(parsedId || '');
    if (await storage.get('legacy_public_id') !== parsedId) {
      await storage.set('legacy_public_id', parsedId);
      if (parsedId && parsedId !== await storage.get('loaded_legacy_beta_decks')) {
        console.log('Loading legacy deck for public id ', parsedId);
        const newlyLoadedDecks = await loadLegacyDecksForPublicId(parsedId, decks, urlLoader);
        decks.splice(decks.length, 0, ...newlyLoadedDecks);
      }
    }
  }

  if (decksOnlyContainedStarter && decks.length > 1) {
    decks.splice(0, 1);
  }
  return decks;
}
