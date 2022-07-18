import {FrogtownStorage} from './storage';

export interface Deck {
  name: string;
  mainboard: string[];
  sideboard: string[];
  keycard: string;
  backgroundUrl: string;
}

export function createNewDeck(num: number) {
  return {
    keycard: '75b56b18-47a3-470b-911c-57da82c5ac03',
    name: `Deck #${num}`,
    mainboard: [],
    sideboard: [],
    backgroundUrl: 'https://i.imgur.com/Hg8CwwU.jpeg',
  };
}

export function ensureValidDeck(deck: Deck): Deck {
  return {
    name: (typeof deck.name === 'string' && deck.name) || 'Deck Name',
    keycard: (typeof deck.keycard === 'string' && deck.keycard) || '',
    backgroundUrl: (typeof deck.backgroundUrl === 'string' && deck.backgroundUrl) || '',
    mainboard: (Array.isArray(deck.mainboard) && deck.mainboard.filter((id) => typeof id === 'string')) || [],
    sideboard: (Array.isArray(deck.sideboard) && deck.sideboard.filter((id) => typeof id === 'string')) || [],
  };
}

export async function loadDecksFromStorage(storage: FrogtownStorage): Promise<Deck[]> {
  const loadedDecks = new Array(Number(await storage.get('deck_count') || '1')).fill(null);
  await Promise.all(loadedDecks.map(async (_, i) => {
    let deck = null;
    try {
      deck = JSON.parse(await storage!.get(`deck_${i}`) || 'null');
    } catch {}
    if (!deck) {
      deck = createNewDeck(i+1);
    }
    loadedDecks[i] = ensureValidDeck(deck);
    console.log('Loaded deck ', i, loadedDecks[i]);
  }));
  console.log('Loaded all decks');

  return loadedDecks;
}

export async function saveDecksToStorage(storage: FrogtownStorage | null, decks: Deck[]): Promise<void> {
  if (!storage) {
    if (decks?.length) {
      console.error('Decks changed before storage ready: ', decks);
    }
    return;
  }
  await Promise.all([
    ...decks.map(async (deck, i) => {
      await storage.set(`deck_${i}`, JSON.stringify(deck));
    }),
    storage.set(`deck_count`, decks.length.toString()),
  ]);
}

export function copyDecks(decks: Deck[]): Deck[] {
  const newDecks: Deck[] = [];
  for (const deck of decks) {
    newDecks.push({
      name: deck.name,
      keycard: deck.keycard,
      mainboard: deck.mainboard.slice(),
      sideboard: deck.sideboard.slice(),
      backgroundUrl: deck.backgroundUrl || 'https://i.imgur.com/Hg8CwwU.jpeg',
    });
  }
  return newDecks;
}
