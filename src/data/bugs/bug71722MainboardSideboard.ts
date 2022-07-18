import {Deck} from '../deck';
import {FrogtownStorage} from '../storage';

// Had a bug that overwrote all sideboards to be identical to mainboards. Unfortunately we can't restore the
// sideboard, so we just delete sideboards that are identical to mainboards.
export async function transformBug71722MainboardSideboard(
    storage: FrogtownStorage,
    decks: Deck[]): Promise<void> {
  if (!(await storage.get('fix_71722_mainboardsideboard'))) {
    await new Promise((resolve) => setTimeout(resolve, 0)); // Incase setDecks was already called elsewhere.
    await storage.set('fix_71722_mainboardsideboard', Date.now().toString());
    for (const deck of decks) {
      if (deck.mainboard.length > 0 && deck.mainboard.sort().join(',') === deck.sideboard.sort().join(',')) {
        deck.sideboard = [];
      }
    }
  }
}
