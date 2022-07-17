
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
    sideboard: (Array.isArray(deck.mainboard) && deck.mainboard.filter((id) => typeof id === 'string')) || [],
  };
}
