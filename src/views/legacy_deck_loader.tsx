import {createNewDeck, Deck} from '../data/deck';
import {StorageProvider} from '../data/storage_provider';
import URLLoader from './components/url_loader';

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
    newDecks: Deck[],
    urlLoader: URLLoader,
): Promise<Deck[]> {
  try {
    const userData: LegacyUserData = JSON.parse(await urlLoader.load(`https://s3.us-west-2.amazonaws.com/frogtown.userdecklists/${legacyPublicId}.json`));
    console.log(userData);
    let cardback = 'https://i.imgur.com/Hg8CwwU.jpeg';
    if (userData.cardbackUrl && userData.cardbackUrl.indexOf('frogtown.me') === -1) {
      cardback = userData.cardbackUrl;
    }
    const loadedDecks = userData.decks.map((a) => {
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
      for (const existingDeck of newDecks) {
        if (mainboardStr === [...existingDeck.mainboard].sort().join(',') &&
            sideboardStr === [...existingDeck.sideboard].sort().join(',')) {
          loadedDecks.splice(i, 1);
        }
      }
    }
    newDecks.splice(newDecks.length, 0, ...loadedDecks);
    // TODO: Toast about importing decks.
  } catch (e) {
    console.error('Unable to load decks from legacy account.');
  }
  return newDecks;
}

export default async function loadLegacyDecksInitial(decks: Deck[],
    setLegacyPublicId: (id: string) => unknown,
    setLegacyBetaPublicId: (id: string) => unknown,
    search: string,
    cookie: string,
    urlLoader: URLLoader,
    storage: StorageProvider,
): Promise<Deck[] | null> {
  const startingDeckCount = decks.length;
  const decksOnlyContainedStarter = decks.length === 1 &&
      JSON.stringify(decks[0]) === JSON.stringify(createNewDeck(1));
  const legacyBetaPublicId = (
    (search.split('?')[1] || '')
        .split('&')
        .filter((v) => v.indexOf('legacyBetaPublicId') === 0)[0] || ''
  ).split('=')[1] || storage.getItem('legacy_beta_public_id');
  setLegacyBetaPublicId(legacyBetaPublicId || '');
  if (legacyBetaPublicId && storage.getItem('legacy_beta_public_id') !== legacyBetaPublicId) {
    storage.setItem('legacy_beta_public_id', legacyBetaPublicId);
    // console.log('Loading legacy deck for beta public id ', legacyBetaPublicId);
    decks = await loadLegacyDecksForPublicId(legacyBetaPublicId, decks, urlLoader);
  }

  if (cookie) {
    const parsedId = cookie
        .split(';')
        .filter((a) => !!a)
        .map((a) => ({key: a.split('=')[0].trim(), value: a.split('=')[1].trim()}))
        .filter((a) => a.key === 'publicId')[0].value;
    setLegacyPublicId(parsedId || '');
    if (storage.getItem('legacy_public_id') !== parsedId) {
      storage.setItem('legacy_public_id', parsedId);
      if (parsedId && parsedId !== storage.getItem('loaded_legacy_beta_decks')) {
        // console.log('Loading legacy deck for public id ', parsedId);
        decks = await loadLegacyDecksForPublicId(parsedId, decks, urlLoader);
      }
    }
  }

  if (decks.length !== startingDeckCount) {
    if (decksOnlyContainedStarter) {
      decks.splice(0, 1);
    }
    return decks;
  }
  return null;
}
