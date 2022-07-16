import {DataLoader} from './data_loader';
import executeNumberRangeFilter from './execute_number_range_filter';

export interface MultiValue {
  values: Record<string, boolean>;
  mode: 'any' | 'all';
  no_others: boolean;
}

export interface FilterData {
  name: string;
  text: string;
  rarity: MultiValue;
  artist: string;
  color: MultiValue;
  color_identity: MultiValue;
  super_type: MultiValue;
  sub_type: string;
  type: MultiValue;
  legal_format: MultiValue;
  power: string;
  toughness: string;
  cmc: string;
  set: string;
  sort_by_release: boolean;
  show_duplicates: boolean;
  exact_name_match: boolean;
}

function cleanName(name: string): string {
  return name.replace(/[,_-]/g, '').toLowerCase();
}

export function rankStringMatch(potentialMatch: string, filterText: string): number {
  if (!potentialMatch) {
    return -1;
  }
  if (potentialMatch === filterText) {
    return 1;
  }
  potentialMatch = cleanName(potentialMatch);
  filterText = cleanName(filterText);
  if (potentialMatch === filterText) {
    return 2;
  }
  if (potentialMatch.indexOf(filterText) >= 0) {
    return 3;
  }
  let trigramMatches = 0;
  for (const word of filterText.split(' ')) {
    for (let i = 0; i < word.length - 2; i++) {
      const trigram = word.substring(i, i + 3);
      if (potentialMatch.indexOf(trigram) >= 0) {
        trigramMatches++;
      }
    }
  }
  if (trigramMatches > 0) {
    return 1000 - trigramMatches;
  }
  return -1;
}

function stringFilterExact(
    cardIds: string[],
    map: Record<string, string | string[]> | null,
    filterValue: string,
): boolean {
  if (!filterValue || !map) {
    return false;
  }

  for (let i = cardIds.length - 1; i >= 0; i--) {
    if (map[cardIds[i]] !== filterValue) {
      cardIds.splice(i, 1);
    }
  }
  return true;
}

function stringFilter(
    cardIds: string[],
    map: Record<string, string | string[]> | null,
    filterValue: string,
): boolean {
  if (!filterValue || !map) {
    return false;
  }

  const results: { cardId: string, rank: number }[] = [];
  for (const id of cardIds) {
    let cardValue = map[id];
    if (!cardValue) {
      continue;
    }
    if (typeof cardValue !== 'string') {
      cardValue = cardValue.join(' ');
    }
    const rank = rankStringMatch(cardValue, filterValue);
    if (rank >= 0) {
      results.push({
        cardId: id,
        rank: rank,
      });
    }
  }
  results.sort((a, b) => a.rank - b.rank);

  const bestRanks: Record<string, number> = {};
  for (let i = 0; i < 100 && i < results.length; i++) {
    bestRanks[results[i].cardId] = results[i].rank;
  }

  for (let i = cardIds.length - 1; i >= 0; i--) {
    if (!bestRanks[cardIds[i]]) {
      cardIds.splice(i, 1);
    }
  }

  cardIds.sort((a, b) => bestRanks[a] - bestRanks[b]);
  return true;
}

function exactStringFilter(
    cardIds: string[],
    map: Record<string, string> | null,
    filterValue: string,
): boolean {
  if (!map || !filterValue) {
    return false;
  }
  for (let i = cardIds.length - 1; i >= 0; i--) {
    if (map[cardIds[i]] !== filterValue) {
      cardIds.splice(i, 1);
    }
  }
  return true;
}

function categoryFilter(
    cardIds: string[],
    map: Record<string, string[] | string> | null,
    filterValue: MultiValue,
): boolean {
  if (!map) {
    return false;
  }

  let allowedCount = 0;
  const allowedValues: Record<string, boolean> = {};
  for (const value in filterValue.values) {
    if (filterValue.values[value]) {
      allowedValues[value] = true;
      allowedCount++;
    }
  }
  if (allowedCount === 0) {
    return false;
  }

  for (let i = cardIds.length - 1; i >= 0; --i) {
    if (!map[cardIds[i]]) {
      cardIds.splice(i, 1);
      continue;
    }
    let values = map[cardIds[i]];
    if (typeof values === 'string') {
      values = [values];
    }

    let matchesFound = 0;
    let mismatchesFound = 0;
    for (const value of values) {
      if (allowedValues[value]) {
        matchesFound++;
      } else {
        mismatchesFound++;
      }
    }

    if ((filterValue.mode === 'all' && matchesFound < allowedCount) ||
      (filterValue.mode === 'any' && matchesFound === 0) ||
      (filterValue.no_others && mismatchesFound > 0)) {
      cardIds.splice(i, 1);
    }
  }

  return true;
}

export default async function executeFilter(
    data: FilterData,
    loader: DataLoader,
): Promise<string[]> {
  const idToName = await loader.getMapData('IDToName');
  const seenName: Record<string, boolean> = {};
  const cardIds: string[] = [];
  for (const id in idToName) {
    if (!data.show_duplicates && seenName[idToName[id]]) {
      continue;
    }
    seenName[idToName[id]] = true;
    cardIds.push(id);
  }

  let anyFilterApplied = false;

  const tryApplyFilter = (result: boolean) => {
    anyFilterApplied = anyFilterApplied || result;
  };

  /* eslint-disable max-len */
  if (!data.exact_name_match) {
    tryApplyFilter(stringFilter(cardIds, idToName!, data.name.trim()));
  } else {
    tryApplyFilter(stringFilterExact(cardIds, idToName!, data.name.trim()));
  }
  tryApplyFilter(stringFilter(cardIds, loader.getMapDataSync('IDToText'), data.text.trim()));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToRarity'), data.rarity));
  tryApplyFilter(stringFilter(cardIds, loader.getMapDataSync('IDToArtist'), data.artist.trim()));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToColor'), data.color));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToColorIdentity'), data.color_identity));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToType'), data.type));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToSupertype'), data.super_type));
  tryApplyFilter(stringFilter(cardIds, loader.getMapDataSync('IDToSubtype'), data.sub_type.trim()));
  tryApplyFilter(categoryFilter(cardIds, loader.getMapDataSync('IDToLegalFormat'), data.legal_format));
  tryApplyFilter(executeNumberRangeFilter(cardIds, loader.getMapDataSync('IDToPower'), data.power.trim()));
  tryApplyFilter(executeNumberRangeFilter(cardIds, loader.getMapDataSync('IDToToughness'), data.toughness.trim()));
  tryApplyFilter(executeNumberRangeFilter(cardIds, loader.getMapDataSync('IDToCMC'), data.cmc.trim()));
  tryApplyFilter(exactStringFilter(cardIds, loader.getMapDataSync('IDToSetCode'), data.set.trim()));
  /* eslint-enable max-len */

  if (!anyFilterApplied) {
    return [];
  }

  if (data.sort_by_release) {
    const idToSetCode = loader.getMapDataSync('IDToSetCode');
    const setCodeToRelease = loader.getMapDataSync('SetCodeToRelease');
    if (idToSetCode && setCodeToRelease) {
      cardIds.sort((a, b) => {
        const aRelease = new Date(setCodeToRelease[idToSetCode[a]]).getTime();
        const bRelease = new Date(setCodeToRelease[idToSetCode[b]]).getTime();
        return bRelease - aRelease;
      });
    }
  } else if (data.name.trim().length === 0 && idToName) {
    cardIds.sort((a, b) => {
      return idToName[a].localeCompare(idToName[b]);
    });
  }

  // Ensure a maximum of 200 cards is displayed.
  cardIds.splice(200, cardIds.length - 200);
  return cardIds;
}
